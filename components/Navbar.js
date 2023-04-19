import colors from "configs/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useTheme } from "providers/ThemeProvider";
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";
const Navbar = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(5px);

  background: rgba(0, 0, 0, 0.04);
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

  transition: left, right 1s linear;

  position: absolute;

  left: ${({ themeProv }) =>
    themeProv === "light" ? "2px" : "calc(100% - 22.5px)"};

  padding: 10px;
  border-radius: 100%;
  background: white;
`;

const LightDark = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  background: black;
  width: 55px;
  padding: 10px 2px;
  border-radius: 15px;
  height: 25px;
  z-index: 0;
  :hover {
    & ${Circle} {
      transition: all 0.15s linear;
      box-shadow: 0px 0px 4px 3px rgba(12, 179, 179, 0.75);
      -webkit-box-shadow: 0px 0px 4px 3px rgba(12, 179, 179, 0.75);
      -moz-box-shadow: 0px 0px 4px 3px rgba(12, 179, 179, 0.75);
    }
  }
`;

const BlogNavbar = () => {
  const { asPath } = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleTheme = () => {
    toggleTheme();
  };

  return (
    <Navbar>
      <NavbarInner>
        <h1>Personal-Blog</h1>

        <FunctionContainer>
          <LightDark onClick={() => handleTheme()}>
            <BsLightbulbFill
              color={"white"}
              size={18}
              style={{ position: "absolute", zIndex: -1, left: "3px" }}
            />
            <Circle themeProv={theme?.type} />
            <BsLightbulbOffFill
              size={18}
              color={"white"}
              style={{
                position: "absolute",
                zIndex: -1,
                right: "3px",
              }}
            />
          </LightDark>

          {asPath !== "/" ? (
            <Link href={"/"}>
              <h2>Home</h2>
            </Link>
          ) : (
            <h2>Home</h2>
          )}
        </FunctionContainer>
      </NavbarInner>
    </Navbar>
  );
};

export default BlogNavbar;
