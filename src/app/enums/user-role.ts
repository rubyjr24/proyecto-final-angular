export enum UserRole {
    User = 'USER',
    Chef = 'CHEF'
}

// variable para la traducción a español
export const UserRoleLabel: Record<UserRole, string> = {
    [UserRole.User]: 'Usuario',
    [UserRole.Chef]: 'Chef',
};