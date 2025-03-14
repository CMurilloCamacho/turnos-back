import {
  UserCredentialDTO,
  UserDTO,
  UserLoginDTO,
  UserRegisterDto,
} from "../dto/userDTO";
import {
  checkUserCredentials,
  getCredentialService,
} from "./credentialService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";
import { UserRepository } from "../repositories/User.Repository";

export const getUserService = async (): Promise<UserDTO[]> => {
  const users: User[] = await UserRepository.find({
    relations: ["credentials"],
  });

  return users;
};

export const getUserByIdService = async (id: number): Promise<UserDTO> => {
  const userFound = await UserRepository.findOne({
    where: { id },
    relations: ["appointments"],
  });

  if (!userFound) throw new Error(`el ID ${id} No existe`);
  else return userFound;
};

export const registerUserService = async (
  user: UserRegisterDto
): Promise<User> => {
  const result = await AppDataSource.transaction(async (entityManager) => {
    const userCredentials: Credential = await getCredentialService(
      entityManager,
      user.username,
      user.password
    );
    const newUser: User = entityManager.create(User, {
      name: user.name,
      email: user.email,
      birthdate: new Date(user.birthdate),
      nDni: user.nDni,
      credentials: userCredentials,
    });
    return await entityManager.save(newUser);
  });
  return result;
};
// const idCredentialUser: Credential = await getCredentialService(
//   user.username,
//   user.password
// );

export const loginUserService = async (
  userCredentials: UserCredentialDTO
): Promise<UserLoginDTO> => {
  const credentialId: number | undefined = await checkUserCredentials(
    userCredentials.username,
    userCredentials.password
  );

  const userFound: User | null = await UserRepository.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
  });
  console.log(userFound);

  return {
    login: true,
    user: {
      ...userFound,
    },
  };
};
