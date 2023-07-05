export interface User {
    id: number;
    login: string;
    email: string;
    country: string;
    sex: string;
    age: number;
}

export type UserWithoutId = Omit<User, "id">