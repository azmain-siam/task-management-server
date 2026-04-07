import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '../../common/response/api-response';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };
  }

  login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return ApiResponse.success('Login successful', {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        phone: dto.phone,
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return ApiResponse.success('Registration successful', {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });
  }
}
