import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../../common/response/api-response';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        image: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return ApiResponse.success('Users retrieved successfully', users);
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        image: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return ApiResponse.success('Profile retrieved successfully', user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        image: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return ApiResponse.success('Profile updated successfully', user);
  }
}
