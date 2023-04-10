import colors from "configs/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Navbar = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(5px);

  background: #f1f2f454;
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

  justify-content: space-between;
  color: ${colors.purble};
  & a {
    text-decoration: none;
    font-weight: 800;
    color: ${colors.purble};
    :hover {
      color: ${colors.lightpurble};
    }

    cursor: pointer;
  }

  & h1 {
    font-size: 30px;
    font-weight: 900;
  }
`;

const BlogNavbar = () => {
  const { asPath } = useRouter();
  return (
    <Navbar>
      <NavbarInner>
        <h1>Personal-Blog</h1>
        {asPath !== "/" ? (
          <Link href={"/"}>
            <h2>Home</h2>
          </Link>
        ) : (
          <h2>Home</h2>
        )}
      </NavbarInner>
    </Navbar>
  );
};

export default BlogNavbar;
