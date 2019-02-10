export interface UserLogin {
  username: string;
  password: string;
}
export interface UserLoginResponse {
  message: string;
  token: string;
  user: User;
}
export interface User {
  user_id: number;
  username: string;
  email: string;
  time_created: string;
  full_name?: string;
  is_admin?: boolean;
}

export interface CheckUsernameResponse {
  username: string;
  available: boolean;
}
export interface UserRegister {
  username: string;
  password: string;
  email: string;
}
export interface UserRegisterResponse {
  message: string;
  user_id: number;
}
