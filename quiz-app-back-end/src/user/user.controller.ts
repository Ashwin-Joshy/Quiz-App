import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './schema/user';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtAuthGuard } from 'src/user/jwtAuthGuard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('create-user')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Post('login-user')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        return this.userService.getProfile(req.user.email);
    }

    @Put('update-profile')
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateProfile(req.user.email, updateUserDto);
    }
}
