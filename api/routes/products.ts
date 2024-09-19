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
    
      img,
      stock,
      category,
      description,
      isFeatured,
      isActive,
      price,
      type,
    } = await c.req.json();

    console.log({     title,
     
      stock,
      category,
      description,
      isFeatured,
      isActive,
      price,
      type,})

    const newProduct = await prisma.product.create({
      data: {
        title,
        
        img,
        stock,
        category:{
          connect:{
            id:category
          }
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
      
      img,
      stock,
      category,
      description,
      isFeatured,
      isActive,
      price,
      type,
    } = await c.req.json();

    const updateProduct = await prisma.product.update({
      where: { id: id },
      data: {
        title,
        img,
        stock,
        category:{
          connect:{
            id:category
          }
        },
        description,
        isFeatured,
        isActive,
        price,
        type,
      },
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
