export const validatePrice = (price: number): void => {
  if ((!price && price !== 0) || isNaN(price))
    throw new Error("Price must be a number greater than 0. Received: " + price);
  if (price < 0) throw new Error("Price must be greater than 0. Received: " + price);
  return;
}
