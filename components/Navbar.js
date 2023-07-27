import colors from "configs/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTheme } from "providers/ThemeProvider";
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";
import navigations from "configs/navigations";
const Navbar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(5px);

  /* background: rgba(0, 0, 0, 0.04); */
`;

const NavbarInner = styled.div`
  padding: 10px 10px;
  margin: auto;

  z-index: 20;
  /* */

  top: 0;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  /* gap: 10px; */
  justify-content: space-between;
  color: ${colors.purble};
  & a {
    text-decoration: none;
    font-weight: 800;
    cursor: pointer;
    color: ${colors.purble};
    :hover {
      color: ${colors.lightpurble};
    }
  }

  & h1 {
    cursor: pointer;
    font-size: 30px;
    font-weight: 900;
  }
`;

const FunctionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Circle = styled.div`
  display: flex;
  z-index: 1;
  /* box-shadow: 0 0 20px rgba(240, 240, 240, 0.5); */
  transition: all 0.15s linear;
  ::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;

    background-color: ${({ themeProv }) =>
      themeProv === "dark" ? "#423966" : "#ffbf71"};
    right: 0;
    border-radius: 50%;
    transition: all 0.15s linear;
    scale: ${({ themeProv }) => (themeProv === "dark" ? "1" : "0")};
    transform: ${({ themeProv }) =>
      themeProv === "dark" ? "translate(30%, -25%)" : "translate(120%, -100%)"};
  }
  position: relative;
  left: ${({ themeProv }) =>
    themeProv === "dark" ? "5px" : "calc(100% - 30px)"};

  padding: 10px;
  border-radius: 100%;
  background: white;

  &.Moon {
    transform: rotate(-75deg);
    box-shadow: 9px 22px 0px -5px rgba(255, 255, 255, 0.1),
      -5px 22px 0px -8px rgba(255, 255, 255, 0.1),
      2px 30px 0px -8px rgba(255, 255, 255, 0.1),
      20px 30px 0px -8px rgba(255, 255, 255, 0.1),
      -2px 37px 0px -8px rgba(255, 255, 255, 0.1),
      10px 37px 0px -8px rgba(255, 255, 255, 0.1),
      20px 45px 0px -8px rgba(255, 255, 255, 0.1),
      5px 50px 0px -6px rgba(255, 255, 255, 0.1);
  }
  &.Sun {
    transform: rotate(0deg);
    box-shadow: 13px -0px 0px -8px white, -13px 0px 0px -8px white,
      9px 9px 0px -8.5px white, -9px -9px 0px -8.5px white,
      -0px -13.5px 0px -8px white, 0px 13.5px 0px -8px white,
      -9px 9px 0px -8.5px white, 9px -9px 0px -8.5px white;
  }
`;

const LightDark = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.15s linear;
  background: ${({ themeProv }) =>
    themeProv === "dark" ? "#423966" : "#ffbf71"};
  width: 85px;
  /* padding: 9px 2px; */
  border-radius: 20px;
  height: 40px;
  z-index: 0;
  :hover {
    & ${Circle} {
      transition: all 0.35s linear;
    }
  }
`;

const Navigations = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NavItem = styled.div`
  display: flex;
  cursor: ${({ isActive }) => (isActive ? "default" : "pointer")};
`;

const BlogNavbar = () => {
  const { asPath } = useRouter();
  const [theme, toggleTheme] = useTheme();

  return (
    <Navbar>
      <NavbarInner>
        {asPath !== "/" ? (
          <Link href={"/"}>
            <h1>Digital Portfolio</h1>
          </Link>
        ) : (
          <h1>Digital Portfolio</h1>
        )}

        <Navigations>
          {navigations?.map((element, index) => (
            <NavItem key={index} isActive={asPath === element.link}>
              {asPath !== element.link ? (
                <Link href={element.link}>
                  <h2>{element.name}</h2>
                </Link>
              ) : (
                <h2>{element.name}</h2>
              )}
            </NavItem>
          ))}
          {/* {asPath !== "/" ? (
            <Link href={"/"}>
              <h2>Home</h2>
            </Link>
          ) : (
            <h2>Home</h2>
          )} */}
        </Navigations>
        <FunctionContainer>
          <LightDark themeProv={theme} onClick={() => toggleTheme()}>
            {/* <BsLightbulbFill
              color={"white"}
              size={18}
              style={{ position: "absolute", zIndex: -1, left: "3px" }}
            /> */}

            <Circle
              className={theme === "dark" ? "Moon" : "Sun"}
              themeProv={theme}
            />
            {/* <BsLightbulbOffFill
              size={18}
              color={"white"}
              style={{
                position: "absolute",
                zIndex: -1,
                right: "3px",
              }}
            /> */}
          </LightDark>
        </FunctionContainer>
      </NavbarInner>
    </Navbar>
  );
};

export default BlogNavbar;
