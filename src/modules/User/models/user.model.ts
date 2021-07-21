export interface createUser {
    name: string,
    gender: string,
    age: number,
    DOB: Date,
    username: string,
    password: string,
    password_confirm: string,
    location: string
}

export interface updateUser {
    name: string,
    gender: string,
    age: number,
    DOB: Date,
    username: string,
    password: string,
    password_confirm: string,
    location: string
}

export interface deleteUser {
    id: string
}
