export type RegisterUser = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export type LoginUser = {
  credential: string;
  password: string;
}
