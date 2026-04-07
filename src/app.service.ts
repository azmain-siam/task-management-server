import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to Task Management Api Server 🚀',
      status: 'OK',
      version: '1.0.0',
      docs: '/api/docs',
    };
  }
}
