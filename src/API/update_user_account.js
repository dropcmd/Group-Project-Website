
// #TODO untest

import { fetchRequest } from "./fetch_methods";
import { apiUserAccount } from "./dictionary";

/*  

    successful expected responses:
    - res.firstName: String
    - res.lastName: String
    - res.email: String
    - res.phone: String
    - res.addresses: List of String
    unsuccessful expected responses:
    - # TODO

*/

export const updateUserAccount = async (  email,
  password,
  confirm_passowrd,
  firstName,
  lastName,
  phone, token) => {
  return await fetchRequest("GET", apiUserAccount(id), {    email: email,
    password: password,
    confirm_passowrd: confirm_passowrd,
    firstName: firstName,
    lastName: lastName,
    phone: phone}, token);
};

export default getSearchProductById;

// // auth route
// export const updateUserAccount = async (
//   token,
//   email,
//   password,
//   confirm_passowrd,
//   firstName,
//   lastName,
//   phone
// ) => {
//   return await updateData(apiUserAccount(), {
//     token: token,
//     email: email,
//     password: password,
//     confirm_passowrd: confirm_passowrd,
//     firstName: firstName,
//     lastName: lastName,
//     phone: phone
//   });
// };

// export default updateUserAccount;
