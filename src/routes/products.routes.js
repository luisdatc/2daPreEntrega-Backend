import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productosRouter = Router();

productosRouter.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ respuesta: "OK", mensaje: prods });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar el producto", mensaje: error });
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
  const { title, description, stock, code, price } = req.body;

  try {
    const prod = await productModel.create({
      title,
      description,
      stock,
      code,
      price,
    });
    res.status(200).send({ respuesta: "OK", mensaje: prod });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear el producto", mensaje: error });
  }
});

export default productosRouter;
