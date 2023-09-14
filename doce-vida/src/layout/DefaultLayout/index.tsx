import { LayoutContainer } from "./styles";

import logoImg from "../../assets/logo.png";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => (
  <LayoutContainer>
    <header>
      <img src={logoImg} alt="" width={100} height={100} />
    </header>

    <Outlet />
  </LayoutContainer>
);