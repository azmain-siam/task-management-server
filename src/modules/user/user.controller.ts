import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorators/get-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@CurrentUser('id') userId: string) {
    return this.userService.getProfile(userId);
  }

  @Put('profile')
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(userId, dto);
  }
}
