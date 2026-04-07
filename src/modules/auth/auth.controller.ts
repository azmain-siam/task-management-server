import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorators/get-user.decorator';
import { ApiResponse } from '../../common/response/api-response';
import type { User } from '../../common/types/user.type';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return ApiResponse.success('Success', user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout() {
    return ApiResponse.success('Logged out successfully');
  }
}
