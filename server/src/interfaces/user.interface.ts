import { ObjWithId } from "common.interface";
import { TCreateRecord, TUpdateRecord } from "./generic.type";
export interface IUserRecord {
  id: number;
  username: string;
  password: string;
}
export interface IUserEntity extends IUserRecord {}

export interface IUserCreate extends TCreateRecord<IUserRecord> {}
export interface IUserUpdate extends TUpdateRecord<IUserRecord> {}
export interface IUserDelete extends ObjWithId {}
