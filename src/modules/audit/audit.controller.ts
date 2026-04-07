import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '../../common/types/auth.types';
import { RolesGuard } from '../auth/guards/role.guard';
import { AuditService } from './audit.service';

@Controller('audit')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @Roles(Role.ADMIN)
  findAll() {
    return this.auditService.findAll();
  }
}
