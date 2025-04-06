import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, name, phone, image } = createUserDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Hash the password before storing
        //const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password; // For simplicity, we are not hashing the password here

        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            name,
            phone,
            image,
            createdDate: new Date(),
            updatedDate: new Date()
        });

        return newUser.save();
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare passwords
        //const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = password === user.password; // For simplicity, we are not hashing the password here
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.validateUser(email, password);

        const payload = { userId: user._id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { access_token: token, ...payload };
    }
    async getProfile(email: string) {
        const profile= await this.userModel.findOne({ email })
        .exec();
        if (!profile) {
            throw new UnauthorizedException('User not found');
        }
        return profile;
    }

    async updateProfile(email: string, updateUserDto: UpdateUserDto) {
        const { password, phone, image, name } = updateUserDto;
    
        const updateFields: Partial<User> = {};
        if (password) updateFields.password = password;
        if (phone) updateFields.phone = phone;
        if (image) updateFields.image = image;
        if (name) updateFields.name = name;
    
        updateFields.updatedDate = new Date();
    
        const updatedProfile = await this.userModel.findOneAndUpdate(
            { email },
            updateFields,
            { new: true }
        ).exec();
    
        if (!updatedProfile) {
            throw new UnauthorizedException('User not found');
        }
    
        return updatedProfile;
    }
}
