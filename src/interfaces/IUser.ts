export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  mobile: string;
  isAdmin: boolean;
  password: string;
  birthDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  matchPassword?(enteredPassword: string): Promise<boolean>;
}
