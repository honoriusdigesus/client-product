import { UserLoginResponse } from "./user-login-response.interface";

export interface LoginResponse {
  user:  UserLoginResponse;
  token: string;
}


