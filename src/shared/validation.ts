export const validatePrice = (price: any): void => {
  if (typeof price !== "number")
    throw new Error("Price must be a number greater than 0. Received: " + price);
  if (price < 0) throw new Error("Price must be greater than 0. Received: " + price);
  return;
}
