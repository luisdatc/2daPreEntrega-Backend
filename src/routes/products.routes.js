import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productosRouter = Router();

productosRouter.get("/", async (req, res) => {
  const { limit, page, category, sort } = req.query;

  let queries = {};

  if (category) {
    queries.category = category;
  }

  try {
    let options = {
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
    };

    if (sort) {
      options.sort = {
        price: sort === "asc" ? 1 : -1,
      };
    }

    const prods = await productModel.paginate(queries, options);

    const respuesta = {
      status: "success",
      payload: prods.docs,
      totalPages: prods.totalPages,
      prevPage: prods.prevPage,
      nextPage: prods.nextPage,
      page: prods.page,
      hasPrevPage: prods.hasPrevPage,
      hasNextPage: prods.hasNextPage,Ñ
    };

    res.status(200).send({ respuesta: "OK", mensaje: respuesta });
  } catch (error) {
    res.status(400).send({ respuesta: "Error en consultar ", mensaje: error });
  }
});

productosRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findById(id);

    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: prod });
    } else {
      res
        .status(404)
        .send({ respuesta: "Error producto no existe", mensaje: "Not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
});

productosRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, stock, code, status, price } = req.body;

  try {
    const prod = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      stock,
      code,
      price,
      status,
    });

    if (prod) {
      res
        .status(200)
        .send({ respuesta: "OK", mensaje: "Producto actualizado" });
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar producto",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en actualizar producto", mensaje: error });
  }
});

productosRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findByIdAndDelete(id);

    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: "Producto Eliminado" });
    } else {
      res.status(404).send({
        respuesta: "Error en Eliminar producto",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en Eliminar producto", mensaje: error });
  }
});

productosRouter.post("/", async (req, res) => {
  const { title, description, stock, code, price, category } = req.body;

  try {
    const prod = await productModel.create({
      title,
      description,
      stock,
      code,
      price,
      category,
    });
    res.status(200).send({ respuesta: "OK", mensaje: prod });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear el producto", mensaje: error });
  }
});

export default productosRouter;
