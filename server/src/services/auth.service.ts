import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { IUserRecord } from "user.interface";

interface IAuth extends Pick<IUserRecord, "username" | "password"> {}

const login = async (params: IAuth) => {
  const { username, password } = params;

  const user = await getRepository(User).findOne({ username: username });

  if (!user) return { error: { message: "Wrong username" } };
  else {
    if (password === user.password) return { data: user };
    else return { error: { message: "Wrong password" } };
  }
};

const register = async (params: IAuth) => {
  const createdUser = await getRepository(User).save({ ...params });

  return createdUser;
};

export default { login, register };
