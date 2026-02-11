import styled from "styled-components";
import { theme } from "../../../theme/theme";
//@ts-ignore
import Main from "./Main/Main.jsx";
import Navbar from "./Navbar/Navbar";
//@ts-ignore
import { initialiseUserSession } from "./helpers/initialiseUserSession.jsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrderContext } from "../../../context/OrderContext";

export default function OrderPage() {
  // state
  const { username } = useParams();
  const { setMenu, setBasket } = useOrderContext();

  useEffect(() => {
    initialiseUserSession(username, setMenu, setBasket);
  }, []);

  //affichage (render)
  return (
    <OrderPageStyled>
      <div className="container">
        <Navbar />
        <Main />
      </div>
    </OrderPageStyled>
  );
}

const OrderPageStyled = styled.div`
  background: ${theme.colors.primary};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background: red;
    height: 95vh;
    width: 1400px;
    display: flex;
    flex-direction: column;
    border-radius: ${theme.borderRadius.extraRound};
  }
`;
