export interface createUser {
    id:string,
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
    id: string,
    name: string,
    gender: string,
    age: number,
    DOB: Date,
    username: string,
    password: string,
    password_confirm: string,
    update_at: Date,
    location: string
}

export interface deleteUser {
    id: string
}