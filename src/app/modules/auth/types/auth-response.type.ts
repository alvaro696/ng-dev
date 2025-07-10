export type Permission = {
  id: number;
  name: string;
  roleId: number;
  haveAdd: boolean;
  haveEdit: boolean;
  haveDelete: boolean;
  haveView: boolean;
  creationDate: Date;
  editionDate: Date | null;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  editionDate: Date | null;
  permissions: Permission[];
};

export type User = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  roleId: number;
  role: Role;
  hireDate: Date;
  creationDate: Date;
  editionDate: Date;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};
