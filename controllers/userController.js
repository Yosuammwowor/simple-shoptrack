import { User } from "../models/User.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

async function controllerGetAllUser(res) {
  const user = await User.create();

  try {
    const result = await user.getUsers();

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerPostUser(data, res) {
  const { username, email, password } = data;

  // Check if property missing
  if (!username || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'username', 'email', or 'password'",
    });
  }

  // Check if incorrect data type
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const id = await nanoid();
  const password_hash = await bcrypt.hash(password, await bcrypt.genSalt());

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

async function controllerPutUser(target, data, res) {
  const { username, email, password } = data;

  // Check if property missing
  if (!username || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'username', 'email', or 'password'",
    });
  }

  // Check incorrect data type
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  // Check missing id target
  if (!target) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id' target" });
  }

  const updated = new Date().toISOString().slice(0, 19).replace("T", " ");
  const password_hash = await bcrypt.hash(password, await bcrypt.genSalt());

  const user = await User.create();

  try {
    const result = await user.putUser(target, {
      username: username,
      email: email,
      password_hash: password_hash,
      updated_at: updated,
    });

    // Check id match
    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid, no user id match" });
    }

    res.status(200).json({
      status: "success",
      message: "Data successfully updated!",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerDeleteUser(target, res) {
  // Check missing value
  if (!target) {
    res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id'" });
  }

  const user = await User.create();

  try {
    const result = await user.deleteUser(target);

    // Check id match
    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid, no user id match" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Data successfully deleted!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export {
  controllerGetAllUser,
  controllerPostUser,
  controllerPutUser,
  controllerDeleteUser,
};
