import type { AxiosInstance } from "axios";
import type { User, UserSession } from "../types/user";
import type { Pagination } from "../types/pagination";


export class AuthService {

    private client: AxiosInstance

    constructor(client: AxiosInstance) {
        this.client = client
    }

    async login(email: string, password: string): Promise<User> {
    try {
      const response = await this.client.post<User>('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<void> {
    try {
      await this.client.post('/auth/signup', {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } catch (error) {
      throw error;
    }
  }

  async logoutAll(): Promise<void> {
    try {
      await this.client.post('/auth/logout/all');
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(): Promise<User> {
    try {
      const response = await this.client.post<User>('/auth/refresh');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await this.client.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSessions(limit: number = 64, offset: number = 0): Promise<Pagination<UserSession>> {
    try {
      const response = await this.client.get<Pagination<UserSession>>('/auth/sessions', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}