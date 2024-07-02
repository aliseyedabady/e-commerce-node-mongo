export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  mobile: string;
  isAdmin: boolean;
  password: string;
  otp: {
    code: string;
    expiresAt: Date;
  };
  birthDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  matchPassword?(enteredPassword: string): Promise<boolean>;
}
