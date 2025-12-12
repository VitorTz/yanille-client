import { AuthService } from "./AuthService";
import { URLService } from "./URLService";
import { TagService } from "./TagService";
import { DashboardService } from "./DashboardService";
import axios, {type AxiosInstance, AxiosError } from "axios";
import { YanilleApiError } from "./YanilleApiError";
import { Constants } from "../constants";


// const BASE_URL = "http://127.0.0.1:8000"
const BASE_URL = Constants.BASE_API_URL;


export class YanilleApi {

  private client: AxiosInstance;
  auth: AuthService
  url: URLService
  tag: TagService
  dashboard: DashboardService

  constructor(baseURL: string = BASE_URL) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        return this.handleError(error);
      }
    );

    this.auth = new AuthService(this.client)
    this.url = new URLService(this.client)
    this.tag = new TagService(this.client)
    this.dashboard = new DashboardService(this.client)
  }

  private handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      const status = error.response.status;
      const data: any = error.response.data;

      if (status === 422 && data.detail) {
        const validationErrors = data.detail
          .map((err: any) => `${err.loc.join('.')}: ${err.msg}`)
          .join(', ');
        throw new YanilleApiError(status, `Validation Error: ${validationErrors}`, data.detail);
      }
    
      const message = data.detail || data.message || error.message;
      throw new YanilleApiError(status, message, data);
    } else if (error.request) {
      throw new YanilleApiError(0, 'Network error: No response from server', error);
    } else {
      throw new YanilleApiError(0, error.message, error);
    }
  }

}


export const api = new YanilleApi();