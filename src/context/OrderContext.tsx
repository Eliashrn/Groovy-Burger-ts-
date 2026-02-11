import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { useMenu } from "../hooks/useMenu";
import { useBasket } from "../hooks/useBasket";
import { findObjectById } from "../utils/array";
import { EMPTY_PRODUCT } from "../constants/product";
import { AdminTabValue } from "../types/Tabs";
import { BasketProductQuantity, MenuProduct } from "../types/Product";

type OrderContextValue = {
  isModeAdmin: boolean;
  setIsModeAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  currentTabSelected: AdminTabValue;
  setCurrentTabSelected: React.Dispatch<React.SetStateAction<AdminTabValue>>;
  menu: MenuProduct[] | undefined;
  setMenu: React.Dispatch<React.SetStateAction<MenuProduct[] | undefined>>;
  handleAdd: (newProduct: MenuProduct, username: string) => void;
  handleDelete: (idOfProductToDelete: string, username: string) => void;
  resetMenu: (username: string) => void;
  newProduct: MenuProduct;
  setNewProduct: React.Dispatch<React.SetStateAction<MenuProduct>>;
  productSelected: MenuProduct;
  setProductSelected: React.Dispatch<React.SetStateAction<MenuProduct>>;
  handleEdit: (productBeingEdited: MenuProduct, username: string) => void;
  titleEditRef: React.RefObject<HTMLInputElement>;
  basket: BasketProductQuantity[];
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>;
  handleAddToBasket: (idProductToAdd: string, username: string) => void;
  handleDeleteBasketProduct: (
    idBasketProduct: string,
    username: string,
  ) => void;
  handleProductSelected: (idProductClicked: string) => Promise<void>;
};

// 1. Création du context
const OrderContext = createContext<OrderContextValue | undefined>(undefined);

// 2. Installation du context
export const OrderContextProvider = ({ children }: PropsWithChildren) => {
  const [isModeAdmin, setIsModeAdmin] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTabSelected, setCurrentTabSelected] =
    useState<AdminTabValue>("add");
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [productSelected, setProductSelected] = useState(EMPTY_PRODUCT);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu } =
    useMenu();
  const { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct } =
    useBasket();

  const handleProductSelected = async (idProductClicked: string) => {
    if (menu) {
      const productClickedOn = findObjectById(idProductClicked, menu);

      if (!productClickedOn) return;
      await setIsCollapsed(false);
      await setCurrentTabSelected("edit");
      await setProductSelected(productClickedOn);
      titleEditRef.current && titleEditRef.current.focus();
    }
  };

  const orderContextValue = {
    isModeAdmin,
    setIsModeAdmin,
    isCollapsed,
    setIsCollapsed,
    currentTabSelected,
    setCurrentTabSelected,
    menu,
    setMenu,
    handleAdd,
    handleDelete,
    resetMenu,
    newProduct,
    setNewProduct,
    productSelected,
    setProductSelected,
    handleEdit,
    titleEditRef,
    basket,
    setBasket,
    handleAddToBasket,
    handleDeleteBasketProduct,
    handleProductSelected,
  };

  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};

// 3. Consommation du context
export const useOrderContext = () => {
  const orderContextData = useContext(OrderContext);
  if (orderContextData === undefined)
    throw new Error(
      "useOrdrContext can only be use within orderContextProvider",
    );
  return orderContextData;
};
