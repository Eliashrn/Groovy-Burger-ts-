import styled from "styled-components";
import { useOrderContext } from "../../../../../../context/OrderContext";
import { theme } from "../../../../../../theme/theme";
import { formatPrice } from "../../../../../../utils/maths";
import Header from "../../../../../reusable-ui/Header";
import { calculateSumToPay } from "./helper";
import CasinoEffect from "../../../../../reusable-ui/CasinoEffect";

export default function BasketHeader() {
  const { basket, menu } = useOrderContext();

  const sumToPay = calculateSumToPay(basket, menu);

  return (
    <Header>
      <BasketHeaderStyled>
        <span className="total">Total</span>
        <CasinoEffect count={formatPrice(sumToPay)} />
      </BasketHeaderStyled>
    </Header>
  );
}

const BasketHeaderStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.primary};
  font-family: "Amatic SC", cursive;
  font-size: ${theme.fonts.size.P4};
  font-weight: ${theme.fonts.weights.bold};
  letter-spacing: 2px;
`;
