import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  static async createToken() {
    // return this.jwtService.sign()
  }

  static async checkToken() {
    // return this.jwtService.verify()
  }
}
