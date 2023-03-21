import { useContext } from "react";
import styled from "styled-components";
import { MobileContext } from "../context/MobileProvider";
import Chats from "./Chats";
import Navbar from "./Navbar";
import SearchUser from "./SearchUser";

const Container = styled.aside`
  background-color: #2c2c2c;
  height: 100vh;
  width: 30%;
  color: white;
  transition: all 0.4s ease;

  @media screen and (max-width: 768px) {
    width: ${({ onMobile }) => (onMobile ? "0" : "100%")};
  }
`;

const Wrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: ${({ onMobile }) => (onMobile ? "none" : "block")};
  }
`;

const SideBar = () => {
  const { onMobile } = useContext(MobileContext);
  return (
    <Container onMobile={onMobile}>
      <Wrapper onMobile={onMobile}>
        <Navbar />
        <SearchUser />
        <hr />
        <Chats />
      </Wrapper>
    </Container>
  );
};

export default SideBar;
