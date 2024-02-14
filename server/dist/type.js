"use strict";
const hello = "";
const userCreateParam = {
    age: 18,
    name: "An",
};
const userUpdateParams = {
    id: 1,
    age: 24,
};
const increaseAge = userUpdateParams.age - userCreateParam.age;
console.log("An now compare with before is have increase", increaseAge);
