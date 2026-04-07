import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    required: false,
    description: 'Full name',
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    type: String,
    example: '+1234567890',
    required: false,
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/image.jpg',
    required: false,
    description: 'Profile image URL',
  })
  @IsString()
  @IsOptional()
  image?: string;
}
