import { UserRole } from "../enums/user-role";

export interface IUser {
    id: string,
    username: string,
    password: string,
    email: string,
    role: UserRole
}
