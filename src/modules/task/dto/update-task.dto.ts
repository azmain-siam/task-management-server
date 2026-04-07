import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    type: String,
    example: 'Task 1',
    required: false,
    description: 'Task title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    example: 'Description for Task 1',
    required: false,
    description: 'Task description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: String,
    example: 'Task 1',
    required: false,
    description: 'Task status',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    type: String,
    example: 'Task 1',
    required: false,
    description: 'Assigned to user ID',
  })
  @IsOptional()
  @IsString()
  assignedToId?: string;
}
