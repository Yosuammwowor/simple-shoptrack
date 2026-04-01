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

async function controllerPostUser(data, res) {
  const { id, username, email, password_hash } = data;

  // Check if property missing
  if (!id || !username || !email || !password_hash) {
    return res.status(400).json({
      status: "fail",
      message:
        "Invalid, missing value 'id', 'username', 'email', or 'password_hash'",
    });
  }

  // Check if incorrect data type
  if (
    typeof id !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password_hash !== "string"
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const user = await User.create();

  try {
    await user.postUser({
      id: id,
      username: username,
      email: email,
      password_hash: password_hash,
    });

    res.status(200).json({
      status: "success",
      message: "Data successfully added!",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ status: "error", message: error.message });
    }

    res.status(500).json({ status: "error", message: error.message });
  }
}

export { controllerGetAllUser, controllerPostUser };
