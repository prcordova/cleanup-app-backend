import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: any): Promise<User> {
    console.log('Tentando salvar usuário no MongoDB:', user); // Debug
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();
    console.log('Usuário salvo com sucesso:', savedUser); // Confirmação
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // Retorna todos os usuários
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec(); // Busca um usuário pelo e-mail
  }
}
