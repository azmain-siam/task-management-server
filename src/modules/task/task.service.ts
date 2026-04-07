import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditAction, Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, actorId: string): Promise<Task> {
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });

    // Audit log
    await this.logAudit(actorId, AuditAction.TASK_CREATED, 'task', task.id, {
      title: task.title,
      description: task.description,
      assignedToId: task.assignedToId,
    });

    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: { assignedTo: true },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { assignedTo: true },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findAssignedTo(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { assignedToId: userId },
      include: { assignedTo: true },
    });
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    actorId: string,
  ): Promise<Task> {
    const existingTask = await this.findOne(id);

    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: { assignedTo: true },
    });

    // Audit log
    const changes = {};
    if (updateTaskDto.title && updateTaskDto.title !== existingTask.title) {
      changes['title'] = { from: existingTask.title, to: updateTaskDto.title };
    }
    if (
      updateTaskDto.description !== undefined &&
      updateTaskDto.description !== existingTask.description
    ) {
      changes['description'] = {
        from: existingTask.description,
        to: updateTaskDto.description,
      };
    }
    if (updateTaskDto.status && updateTaskDto.status !== existingTask.status) {
      changes['status'] = {
        from: existingTask.status,
        to: updateTaskDto.status,
      };
      await this.logAudit(
        actorId,
        AuditAction.STATUS_CHANGED,
        'task',
        id,
        changes,
      );
    }
    if (
      updateTaskDto.assignedToId !== undefined &&
      updateTaskDto.assignedToId !== existingTask.assignedToId
    ) {
      changes['assignedToId'] = {
        from: existingTask.assignedToId,
        to: updateTaskDto.assignedToId,
      };
      await this.logAudit(
        actorId,
        AuditAction.ASSIGNMENT_CHANGED,
        'task',
        id,
        changes,
      );
    }
    if (
      Object.keys(changes).length > 0 &&
      !changes['status'] &&
      !changes['assignedToId']
    ) {
      await this.logAudit(
        actorId,
        AuditAction.TASK_UPDATED,
        'task',
        id,
        changes,
      );
    }

    return task;
  }

  async remove(id: string, actorId: string): Promise<void> {
    const task = await this.findOne(id);

    await this.prisma.task.delete({
      where: { id },
    });

    // Audit log
    await this.logAudit(actorId, AuditAction.TASK_DELETED, 'task', id, {
      title: task.title,
      description: task.description,
      status: task.status,
      assignedToId: task.assignedToId,
    });
  }

  private async logAudit(
    actorId: string,
    action: AuditAction,
    targetEntity: string,
    targetId: string,
    relevantData: any,
  ): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        actorId,
        action,
        targetEntity,
        targetId,
        relevantData,
      },
    });
  }
}
