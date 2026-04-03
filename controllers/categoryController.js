import { Category } from "../models/Category.js";
import { nanoid } from "nanoid";

async function controllerGetAllCategories(req, res) {
  try {
    const category = await Category.create();
    const result = await category.getCategories();

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerGetCategory(req, res) {
  const id = req.params.id;

  // Check missing id
  if (!id) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id'" });
  }

  try {
    const category = await Category.create();
    const result = await category.getCategory(id);

    // Check id match
    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no category id match" });
    }

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerPostCategory(req, res) {
  const { name, description } = req.body;

  // Check missing property
  if (!name || !description) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'name' or 'description'",
    });
  }

  // Check incorrect data types
  if (typeof name !== "string" || typeof description !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const id = await nanoid();

  try {
    const category = await Category.create();
    await category.postCategory({
      id: id,
      name: name,
      description: description,
    });

    res
      .status(201)
      .json({ status: "success", message: "Data successfully added!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ status: "fail", message: error.message });
    }

    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerPutCategory(req, res) {
  const id = req.params.id;
  const { name, description } = req.body;

  // Check missing id
  if (!id) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id'" });
  }

  // Check missing value
  if (!name || !description) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'name' or 'description'",
    });
  }

  // Check incorrect data type
  if (typeof name !== "string" || typeof description !== "string") {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const category = await Category.create();
    const result = await category.putCategory(
      { name: name, description: description, updated_at: updated_at },
      id,
    );

    // Check id match
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no category id match" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Data successfully updated!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerDeleteCategory(req, res) {
  const id = req.params.id;

  // Check missing id
  if (!id) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id'" });
  }

  try {
    const category = await Category.create();
    const result = await category.deleteCategory(id);

    // Check id match
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Invalid, no category id match" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Data successfully deleted!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export {
  controllerGetAllCategories,
  controllerGetCategory,
  controllerPostCategory,
  controllerPutCategory,
  controllerDeleteCategory,
};
