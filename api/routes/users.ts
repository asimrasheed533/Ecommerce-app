import { Hono } from "hono";
import catchFun from "../utils/catch";
import prisma from "../lib/prisma";

const users = new Hono();

users.get("/", async (c) => {
  try {
    const users = await prisma.user.findMany();
    return c.json(users);
  } catch (err: any) {
    catchFun(err, c);
  }
});

users.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return c.json(user);
  } catch (err: any) {
    catchFun(err, c);
  }
});

users.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { password: true },
    });

    if (!user) {
      return c.json({ error: "invalid credentials" });
    }
    const isMatch = password === user.password;

    if (!isMatch) {
      return c.json({ error: "Invalid credentials" });
    } else {
      return c.json({ message: "User logged in successfully" });
    }
  } catch (err: any) {
    catchFun(err, c);
  }
});

users.post("/register", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: "All fields are required" });
    }

    const oldUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (oldUser) {
      return c.json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return c.json(user);
  } catch (err: any) {
    catchFun(err, c);
  }
});

users.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const { email, password, name } = await c.req.json();

    const updateUser = await prisma.user.update({
      where: { id: id },
      data: {
        email,
        password,
        name,
      },
    });

    return c.json(updateUser);
  } catch (err: any) {
    catchFun(err, c);
  }
});

users.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const deleteUser = await prisma.user.delete({
      where: { id: id },
    });

    return c.json(deleteUser);
  } catch (err: any) {
    catchFun(err, c);
  }
});

export default users;
