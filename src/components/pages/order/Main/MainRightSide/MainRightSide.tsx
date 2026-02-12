import styled from "styled-components";
import { useOrderContext } from "../../../../../context/OrderContext";
import { theme } from "../../../../../theme/theme";
import Admin from "./Admin/Admin";
import Menu from "./Menu/Menu";

export default function MainRightSide() {
  const { isModeAdmin } = useOrderContext();

  return (
    <MainRightSideStyled>
      <Menu />
      {isModeAdmin && <Admin />}
    </MainRightSideStyled>
  );
}

const MainRightSideStyled = styled.div`
  position: relative;
  overflow-y: hidden;
  display: grid;
  border-bottom-right-radius: ${theme.borderRadius.extraRound};
`;
