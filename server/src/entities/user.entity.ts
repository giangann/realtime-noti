import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { BaseEntity } from "./base.entity";

// Entities

@Entity("user", { orderBy: { id: "DESC" } })
export class User extends BaseEntity {
  // username, password, phone_number, fullname, company_name, note, *softdelete

  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ length: 100, nullable: false })
  @Unique(["username"])
  username: string;

  @Column({ length: 100, nullable: false, select: true })
  password: string;

  @Column()
  isAdmin: boolean;
}
