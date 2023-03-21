import styled from "styled-components";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";

const Container = styled.section`
  display: flex;
  overflow: hidden;
`;

const Home = () => {
  return (
    <Container>
      <SideBar />
      <ChatBox />
    </Container>
  );
};

export default Home;
