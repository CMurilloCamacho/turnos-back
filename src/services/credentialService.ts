import crypt from "bcryptjs";
import { Credential } from "../entities/Credential.entity";
import { EntityManager } from "typeorm";
import { CredentialRepository } from "../repositories/Credential.Repository";

const passCrypt = async (password: string): Promise<string> => {
  const salt = await crypt.genSalt(10);
  const hashedPass = await crypt.hash(password, salt);
  return hashedPass;
};
const comparePassword = async (
  password: string,
  hashedPass: string
): Promise<boolean> => {
  return await crypt.compare(password, hashedPass);
};

const checkUserExist = async (username: string): Promise<void> => {
  const credentialFound: Credential | null = await CredentialRepository.findOne({
    where: { username: username },
  });

  if (credentialFound)
    throw new Error(`El usuario con username ${username} ya existe`);
};

export const getCredentialService = async (
  EntityManager: EntityManager,
  username: string,
  password: string
): Promise<Credential> => {
  await checkUserExist(username);
  const passwordEncrypted = await passCrypt(password);

  const credentialObject: Credential = EntityManager.create(Credential, {
    username,
    password: passwordEncrypted,
  });

  return await EntityManager.save(credentialObject);
};

export const checkUserCredentials = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const credentialFound: Credential | null = await CredentialRepository.findOne({
    where: { username: username },
  });
  if (!credentialFound) throw new Error(`Usuario o contraseña incorrecto`);

  const passwordMatch = await comparePassword(password, credentialFound.password)
  if(!passwordMatch) throw new Error('Usuario o contraseña incorrecto')
 
  
  
  
  if(!passwordMatch) throw new Error(`Usuario o contraseña incocrrecto`)
    else return credentialFound.id
  


};
