import { CurrencyToggler, GlobalDataBar, SearchBar } from "components";
import { useAppDispatch } from "hooks";
import { toggleTheme } from "store/settingsSlice";
import {
  NavContainer,
  StyledLink,
  LinksContainer,
  ThemeButtonContainer,
  ThemeChangeButton,
  RightPanel,
  FirstRow,
  SecondRow,
} from "./Navbar.styles";
function Navbar() {
  const dispatch = useAppDispatch();

  return (
    <NavContainer>
      <FirstRow>
        <LinksContainer>
          <StyledLink to="/">Coins</StyledLink>
          <StyledLink to="/portfolio">Portfolio</StyledLink>
        </LinksContainer>

        <RightPanel>
          <SearchBar />

          <CurrencyToggler />

          <ThemeButtonContainer>
            <ThemeChangeButton
              onClick={() => dispatch(toggleTheme())}
            ></ThemeChangeButton>
          </ThemeButtonContainer>
        </RightPanel>
      </FirstRow>

      <SecondRow>
        <GlobalDataBar />
      </SecondRow>
    </NavContainer>
  );
}

export default Navbar;
