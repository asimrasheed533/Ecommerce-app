import { Hono } from "hono";
import catchFun from "../utils/catch";
import prisma from "../lib/prisma";

const orders = new Hono();

orders.get("/", async (c) => {
  try {
    const order = await prisma.order.findMany();

   return c.json(order);
  } catch (err: any) {
    catchFun(err, c);
  }
});

orders.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const order = await prisma.order.findUnique({
      where: { id: id },
    });

    if (!order) {
      return c.json({
        message: "Order not found",
      });
    }

    c.json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (err: any) {
    catchFun(err, c);
  }
});

orders.post("/", async (c) => {
  try {
    const { firstName, lastName, cityTown, number, email, products } =
      await c.req.json();

    if (
      !firstName ||
      !lastName ||
      !cityTown ||
      !number ||
      !email ||
      !products
    ) {
      return c.json({ error: "All fields are required" });
    }

    const newOrder = await prisma.order.create({
      data: {
        firstName,
        lastName,
        cityTown,
        number,
        email,
        products: {
          connect: products
            .filter((item: any) => item.id)  // Ensure the item has an `id`
            .map((item: any) => ({
              id: item.id  // Map to the format `{ id: item.id }`
            })),
        },
      },
    });
    

   return c.json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err: any) {
    catchFun(err, c);
  }
});

orders.put("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const { firstName, lastName, cityTown, number, email, products } =
      await c.req.json();

    if (
      !firstName ||
      !lastName ||
      !cityTown ||
      !number ||
      !email ||
      !products
    ) {
      return c.json({ error: "All fields are required" });
    }

    const updateOrder = await prisma.order.update({
      where: { id: id },
      data: {
        firstName,
        lastName,
        cityTown,
        number,
        email,
        products,
      },
    });

    c.json({
      message: "Order updated successfully",
      data: updateOrder,
    });
  } catch (err: any) {
    catchFun(err, c);
  }
});

orders.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();

    const deleteOrder = await prisma.order.delete({
      where: { id: id },
    });

    c.json({
      message: "Order deleted successfully",
      data: deleteOrder,
    });
  } catch (err: any) {
    catchFun(err, c);
  }
});

export default orders;
