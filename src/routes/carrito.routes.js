import { Router } from "express";
import { cartModel } from "../models/cart.models.js";

import { productModel } from "../models/products.models.js";

const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await cartModelModel.findById(id);

    if (cart) {
      res.status(200).send({ respuesta: "OK", mensaje: cart });
    } else {
      res.status(404).send({
        respuesta: "Error en consultar el carrito",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en consultar el carrito", mensaje: error });
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await cartModel.create();
    res.status(200).send({ respuesta: "OK", mensaje: cart });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear el carrito", mensaje: error });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);
      if (prod) {
        const indice = cart.products.findIndex((prod) => prod.id_prod === pid);
        if (indice != -1) {
          cart.products[indice].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }
        const response = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "Ok", mensaje: response });
      } else {
        res.status(404).send({
          respuesta: "Error en agregar producto el carrito",
          mensaje: "Product Not Found",
        });
      }
    } else {
      res.status(404).send({
        respuesta: "Error en agregar producto el carrito",
        mensaje: " Cart Not Found",
      });
    }
  } catch (error) {
    res.status(400).send({
      respuesta: "Error en agregar producto al carrito",
      mensaje: "Not Found",
    });
  }
});

export default cartsRouter;
