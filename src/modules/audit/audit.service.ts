import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.auditLog.findMany({
      include: { actor: { select: { id: true, email: true, fullName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
