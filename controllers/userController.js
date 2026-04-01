import { User } from "../models/User.js";

async function controllerGetAllUser() {
  const user = await User.create();

  try {
    const res = await user.getUsers();

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { controllerGetAllUser };
