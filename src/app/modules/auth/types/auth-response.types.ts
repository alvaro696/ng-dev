export type User = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  roleId: number;
  hireDate: Date;
  creationDate: Date;
  editionDate: Date;
}

export type AuthResponse = {
  user: User;
  accessToken: string;
}

export type LoginResponse = {
  message: string;
  token: string;
  user: User;
}
