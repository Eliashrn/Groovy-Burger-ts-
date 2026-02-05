import { BasketProductQuantity } from "./../types/Product";
import { useState } from "react";
import {
  deepClone,
  findObjectById,
  findIndexById,
  removeObjectById,
} from "../utils/array";
import { setLocalStorage } from "../utils/window";

export const useBasket = () => {
  const [basket, setBasket] = useState<BasketProductQuantity[]>([]);

  const handleAddToBasket = (idProductToAdd: string, username: string) => {
    if (basket) {
      const basketCopy = deepClone(basket);
      const productAlreadyInBasket = findObjectById(idProductToAdd, basketCopy);

      if (productAlreadyInBasket) {
        incrementProductAlreadyInBasket(idProductToAdd, basketCopy, username);
        return;
      }

      createNewBasketProduct(idProductToAdd, basketCopy, setBasket, username);
    }
  };

  const incrementProductAlreadyInBasket = (
    idProductToAdd: string,
    basketCopy: BasketProductQuantity[],
    username: string,
  ) => {
    const indexOfBasketProductToIncrement = findIndexById(
      idProductToAdd,
      basketCopy,
    );
    basketCopy[indexOfBasketProductToIncrement].quantity += 1;
    setBasket(basketCopy);
    setLocalStorage(username, basketCopy);
  };

  const createNewBasketProduct = (
    idProductToAdd: string,
    basketCopy: BasketProductQuantity[],
    setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
    username: string,
  ) => {
    if (basket) {
      const newBasketProduct = { id: idProductToAdd, quantity: 1 };
      const newBasket = [newBasketProduct, ...basketCopy];
      setBasket(newBasket);
      setLocalStorage(username, newBasket);
    }
  };

  const handleDeleteBasketProduct = (
    idBasketProduct: string,
    username: string,
  ) => {
    const basketUpdated = removeObjectById(idBasketProduct, basket);
    setBasket(basketUpdated);
    setLocalStorage(username, basketUpdated);
  };

  return { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct };
};
