import { Hono } from "hono";
import catchFun from "../utils/catch";
import prisma from "../lib/prisma";

const products = new Hono();

products.get("/", async (c) => {
  try {
    const products = await prisma.product.findMany();
    return c.json(products);
  } catch (err: any) {
    catchFun(err, c);
  }
});

products.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    return c.json(product);
  } catch (err: any) {
    catchFun(err, c);
  }
});

products.post("/add", async (c) => {
  try {
    const {
      title,
      author,
      img,
      stock,
      category,
      description,
      isFeatured,
      isActive,
      price,
      type,
    } = await c.req.json();

    const newProduct = await prisma.product.create({
      data: {
        title,
        author,
        img,
        stock,
        category: {
          connect: {
            id: category,
          },
        },
        description,
        isFeatured,
        isActive,
        price,
        type,
      },
    });

    return c.json(newProduct);
  } catch (err: any) {
    catchFun(err, c);
  }
});

products.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const {
      title,
      author,
      img,
      stock,
      category,
      description,
      isFeatured,
      isActive,
      price,
      type,
    } = await c.req.json();

    // Build the data object dynamically
    const data: any = {};

    if (title !== undefined) data.title = title;
    if (author !== undefined) data.author = author;
    if (img !== undefined) data.img = img;
    if (stock !== undefined) data.stock = stock;
    if (description !== undefined) data.description = description;
    if (isFeatured !== undefined) data.isFeatured = isFeatured;
    if (isActive !== undefined) data.isActive = isActive;
    if (price !== undefined) data.price = price;
    if (type !== undefined) data.type = type;

    // Handle the category connect conditionally
    if (category !== undefined) {
      data.category = {
        connect: {
          id: category,
        },
      };
    }

    const updateProduct = await prisma.product.update({
      where: { id: id },
      data: data,
    });

    return c.json(updateProduct);
  } catch (err: any) {
    catchFun(err, c);
  }
});

products.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const deleteProduct = await prisma.product.delete({
      where: { id: id },
    });

    return c.json(deleteProduct);
  } catch (err: any) {
    catchFun(err, c);
  }
});

export default products;
