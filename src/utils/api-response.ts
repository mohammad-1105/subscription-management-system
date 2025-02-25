export class ApiResponse {
  statusCode: number;
  message: string;
  data: unknown;
  success: boolean;

  constructor(statusCode: number, message: string = "success", data: unknown) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}
