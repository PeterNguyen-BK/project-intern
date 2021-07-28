export interface createIUser {
    name: string,
    gender: string,
    age: number,
    DOB: string,
    username: string,
    password: string,
    password_confirm: string,
    location: string
}

export interface updateIUser {
    name: string,
    gender: string,
    age: number,
    DOB: string,
    username: string,
    password: string,
    location: string
}

export interface deleteIUser {
    _id: string
}
