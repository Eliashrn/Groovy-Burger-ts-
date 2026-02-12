import { getMenu } from "../../../../api/product";
import { BasketProductQuantity, MenuProduct } from "../../../../types/Product";
import { getLocalStorage } from "../../../../utils/window";

const intialiseMenu = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<MenuProduct[] | undefined>>,
) => {
  const menuReceived = await getMenu(username);
  setMenu(menuReceived);
};

const intialiseBasket = (
  username: string,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
) => {
  const basketReceived = getLocalStorage(username); // localStorage est synchrone, pas besoin de "await".
  if (basketReceived) setBasket(basketReceived as BasketProductQuantity[]);
};

export const initialiseUserSession = async (
  username: string | undefined,
  setMenu: React.Dispatch<React.SetStateAction<MenuProduct[] | undefined>>,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
) => {
  if (username) {
    await intialiseMenu(username, setMenu);
    intialiseBasket(username, setBasket);
  }
};
