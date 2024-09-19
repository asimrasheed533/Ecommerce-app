import { Hono } from "hono";
import catchFun from "../utils/catch";
import prisma from "../lib/prisma";

const categories = new Hono();

categories.get("/", async (c) => {
  try {
    const categories = await prisma.category.findMany();
    return c.json(categories);
  } catch (err: any) {
    catchFun(err, c);
  }
});

categories.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const category = await prisma.category.findUnique({
      where: { id: id },
    });

    return c.json(category);
  } catch (err: any) {
    catchFun(err, c);
  }
});

categories.post("/add", async (c) => {
  try {
    const { name, img } = await c.req.json();

    if (!name || !img) {
      return c.json({ error: "All fields are required" });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        img,
      },
    });

    return c.json(newCategory);
  } catch (err: any) {
    catchFun(err, c);
  }
});

categories.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const { name, img } = await c.req.json();
console.log("name, img" ,id, name  , img)
    if (!name || !img) {
      return c.json({ error: "All fields are required" });
    }

    const updateCategory = await prisma.category.update({
      where: { id: id },
      data: {
        name,
        img,
      },
    });

    return c.json(updateCategory);
  } catch (err: any) {
    catchFun(err, c);
  }
});

categories.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const deleteCategory = await prisma.category.delete({
      where: { id: id },
    });

    return c.json(deleteCategory);
  } catch (err: any) {
    catchFun(err, c);
  }
});

export default categories;
