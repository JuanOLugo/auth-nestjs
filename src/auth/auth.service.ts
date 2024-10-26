import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private users = []; // Puedes usar una base de datos en lugar de un arreglo

  constructor(private readonly jwtService: JwtService) {}

  async register(userDto: any) {
    const { username, password } = userDto;
    // Verifica si el usuario ya existe
    const existingUser = this.users.find(user => user.username === username);
    if (existingUser) {
      return {message: "Usuario ya existe"}
    }
    // Guarda el nuevo usuario
    this.users.push({ username, password });
    return { message: 'Usuario registrado' };
  }

  async login(userDto: any) {
    const { username, password } = userDto;
    // Busca al usuario
    const user = this.users.find(
      user => user.username === username && user.password === password,
    );
    if (!user) {
      return {message: "Credenciales invalidas"};
    }
    // Genera un token JWT
    const payload = { username: user.username, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
