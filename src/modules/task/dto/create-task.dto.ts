import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    example: 'Task 1',
    required: true,
    description: 'Task title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

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
    description: 'Assigned to user ID',
  })
  @IsOptional()
  @IsString()
  assignedToId?: string;
}
