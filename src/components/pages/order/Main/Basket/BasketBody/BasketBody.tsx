import { isEmpty } from "../../../../../../utils/array";
import { useOrderContext } from "../../../../../../context/OrderContext";
import EmptyBasket from "./EmptyBasket";
import BasketProducts from "./BasketProducts";

export default function BasketBody() {
  const { basket, menu } = useOrderContext();

  return (
    <>
      {isEmpty(basket) ? (
        <EmptyBasket isLoading={menu === undefined} />
      ) : (
        <BasketProducts />
      )}
    </>
  );
}
