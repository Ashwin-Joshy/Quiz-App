import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserJwtStrategy } from './user.jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        JwtModule.register({
            secret:  process.env.JWT_SECRET || "asdasdwadsdasd",
            signOptions: { expiresIn: process.env.JWT_EXPIRATION || '24h' },
        }),
    ],
    controllers: [UserController],
    exports: [UserService, JwtModule],
    providers: [UserService,UserJwtStrategy]
})
export class UserModule { }
