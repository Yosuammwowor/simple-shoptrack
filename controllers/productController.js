import { Product } from "../models/Product.js";
import { nanoid } from "nanoid";

async function controllerGetAllProducts(req, res) {
  try {
    const product = await Product.create();
    const result = await product.getProducts();

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerGetProduct(req, res) {
  const id = req.params.id;

  // Check missing id
  if (!id) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id'" });
  }

  try {
    const product = await Product.create();
    const result = await product.getProduct(id);

    // Check id match
    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no product id match" });
    }

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerPostProduct(req, res) {
  const { name, price } = req.body;
  let { category_id, user_id } = req.body;

  // Check missing property
  if (!name || !price) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'name' or 'price'",
    });
  }

  // Set category_id & user_id default value
  if (!category_id || !user_id) {
    category_id = null;
    user_id = null;
  }

  // Check incorrect data type
  if (
    typeof name !== "string" ||
    typeof price !== "number" ||
    (typeof category_id !== "string" && typeof category_id !== "object") ||
    (typeof user_id !== "string" && typeof user_id !== "object")
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const id = await nanoid();

  try {
    const product = await Product.create();
    await product.postProduct({
      id: id,
      name: name,
      price: price,
      category_id: category_id,
      user_id: user_id,
    });

    res
      .status(200)
      .json({ status: "success", message: "Data successfully added!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ status: "error", message: error.message });
    }

    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerPutProduct(req, res) {
  const id = req.params.id;
  const { name, price } = req.body;
  let { category_id, user_id } = req.body;

  // Check missing id
  if (!id) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id'" });
  }

  // Check missing property
  if (!name || !price) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'name' or 'price'",
    });
  }

  // Set category_id & user_id default value
  if (!category_id || !user_id) {
    category_id = null;
    user_id = null;
  }

  // Check incorrect data type
  if (
    typeof name !== "string" ||
    typeof price !== "number" ||
    (typeof category_id !== "object" && typeof category_id !== "string") ||
    (typeof user_id !== "object" && typeof user_id !== "string")
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, incorrect data type" });
  }

  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const product = await Product.create();
    const result = await product.putProduct(
      {
        name: name,
        price: price,
        category_id: category_id,
        user_id: user_id,
        updated_at: updated_at,
      },
      id,
    );

    // Check id match
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no product id match" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Data successfully updated!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

async function controllerDeleteProduct(req, res) {
  const id = req.params.id;

  // Check missing id
  if (!id) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, missing value 'id'" });
  }

  try {
    const product = await Product.create();
    const result = await product.deleteProduct(id);

    // Check id match
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Invalid, no product id match" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Data successfully deleted!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export {
  controllerGetAllProducts,
  controllerGetProduct,
  controllerPostProduct,
  controllerPutProduct,
  controllerDeleteProduct,
};
