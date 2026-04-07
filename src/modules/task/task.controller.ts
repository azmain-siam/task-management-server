import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorators/get-user.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '../../common/types/auth.types';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.taskService.findAll();
  }

  @Get('my')
  @Roles(Role.USER, Role.ADMIN)
  findMyTasks(@CurrentUser('id') userId: string) {
    return this.taskService.findAssignedTo(userId);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    if (role === 'USER') {
      // Check if task is assigned to user
      const task = await this.taskService.findOne(id);
      if (task.assignedToId !== userId) {
        throw new Error('You can only update tasks assigned to you');
      }
      // Users can only update status
      if (
        updateTaskDto.title ||
        updateTaskDto.description ||
        updateTaskDto.assignedToId
      ) {
        throw new Error('Users can only update task status');
      }
    }
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.taskService.remove(id, userId);
  }
}
