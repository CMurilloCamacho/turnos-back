export interface UserRegisterDto {
  name: string,
  nDni: number,
  email: string,
  username: string
  password: string
  birthdate: Date
}

export interface UserCredentialDTO {
  username: string,
  password: string,
}  

export interface  UserLoginDTO {
  login: boolean,
  user: UserDataLoginDTO,
}
  

interface UserDataLoginDTO {
  id?:number,
  name?: string,
  nDni?: number,
  email?: string,
  birthdate?: Date
}


export interface UserDTO {
  id:number,
  name:string,
  email: string
}