import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/response/api-response';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const auditLogs = await this.prisma.auditLog.findMany({
      include: { actor: { select: { id: true, email: true, fullName: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return ApiResponse.success('Audit logs retrieved successfully', auditLogs);
  }
}
