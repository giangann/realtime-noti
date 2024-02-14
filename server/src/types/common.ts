// Base and Generics type
type TRowUpdate<T> = Partial<T> & { id: number };
type TRowCreate<T> = Omit<T, "id">;

// Interface use Base and Generices type
interface IUserRecord {
  id: number;
  name: string;
  age: number;
}
interface IUserUpdate extends TRowUpdate<IUserRecord> {}
interface IUserCreate extends TRowCreate<IUserRecord> {}

const hello: string = "";
const userCreateParam: IUserCreate = {
  age: 18,
  name: "An",
};
const userUpdateParams: IUserUpdate = {
  id: 1,
  age: 24,
};

const increaseAge = (userUpdateParams.age as number) - userCreateParam.age;
console.log("An now compare with before is have increase", increaseAge);
