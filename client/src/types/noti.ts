import { IUser } from "./user";

export interface INoti {
  content: string;
  from_user: IUser;
  isRead: boolean;
  createdAt: string | Date;
}
