import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'admin@petzy.com',
    required: true,
    description: 'User email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    example: '12345678',
    required: true,
    description: 'User password',
  })
  @IsString()
  password: string;
}
