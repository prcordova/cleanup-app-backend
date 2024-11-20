import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const result = user.toObject();
    delete result.password; // Remove o campo password
    return result;
  }

  // Realiza login e retorna o token JWT
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id, // Identificador único do usuário
      role: user.role, // Adiciona o role ao payload
      name: user.name, // Adiciona o nome ao payload
    };
    const token = this.jwtService.sign(payload);
    console.log('Token Gerado:', token); // Loga o token gerado no console
    return {
      access_token: token,
    };
  }

  // Registra um novo usuário
  async register(user: any) {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersService.create({
      ...user,
      password: hashedPassword,
    });
  }
}
