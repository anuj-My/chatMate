import styled from "styled-components";
import Chats from "./Chats";
import Navbar from "./Navbar";
import SearchUser from "./SearchUser";

const Container = styled.aside`
  background-color: #2c2c2c;
  height: 100vh;
  flex: 1;
  color: white;
`;

const SideBar = () => {
  return (
    <Container>
      <Navbar />
      <SearchUser />
      <hr />
      <Chats />
    </Container>
  );
};

export default SideBar;
