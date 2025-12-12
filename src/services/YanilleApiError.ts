

export class YanilleApiError extends Error {
  status: number;
  details: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.name = 'YanilleApiError';
    this.status = status;
    this.details = details;
  }
}