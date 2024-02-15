import { ObjWithId } from "common.interface";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";

const detail = async (params: ObjWithId) => {
  const { id } = params;
  const user = await getRepository(User).findOne(id);

  return user;
};
export default { detail };
