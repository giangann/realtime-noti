import { ObjWithId } from "common.interface";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { IUserRecord } from "user.interface";

const list = async (params: Pick<IUserRecord, "isAdmin">) => {
  const listUser = await getRepository(User).find({ ...params });

  return listUser;
};
const detail = async (params: ObjWithId) => {
  const { id } = params;
  const user = await getRepository(User).findOne(id);

  return user;
};
export default { detail, list };
