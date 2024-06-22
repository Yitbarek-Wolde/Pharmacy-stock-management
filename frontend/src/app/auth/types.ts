export interface signinType {
    email: string,
    password: string,
}

export interface signupType {
    fullname: string,
    email: string,
    password: string,
}

export type User = { 
    _id: string, 
    fullname: string, 
    email: string, 
    password: string 
}

export interface userStateType {
    _id: string,
    fullname: string,
    email: string,
 
    jwt?: string;
}

export const userInitialState: userStateType = {
    _id: '',
    fullname: 'Guest',
    email: '',
    jwt: ''
}

export interface signinResponseType {
    success: boolean, 
    data: string 
}

export interface signUpResponseType {
    success: boolean, 
    data: User
}
