import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.nterface';

@Injectable()
export class AxiosAdapter<T> implements HttpAdapter<T> {
  constructor() {}
  private readonly axios: AxiosInstance = axios;
  async get(url: string): Promise<T> {
    try {
      const { data }: { data: T } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Error interno');
    }
  }
}
