export interface createUser {
    id:string,
    name: string,
    age: number,
    DOB: Date,
    username: string,
    password: string,
    password_confirm: string,
    create_at: Date,
    update_at: Date,
    location: string
}

export interface updateUser {
    id: string,
    name: string,
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