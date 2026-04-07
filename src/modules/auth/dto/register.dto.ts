import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    example: 'user@example.com',
    required: true,
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password123',
    required: true,
    description: 'User password',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    required: true,
    description: 'Full name',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    example: '+1234567890',
    required: false,
    description: 'Phone number',
  })
  @IsString()
  phone?: string;
}
