export default function catchFun(error: Error, c: any) {
  console.error(error);
  return c.status(500).json({
    error: error.message || error.toString() || "Something went wrong",
  });
}
