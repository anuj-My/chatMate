import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { useContext } from "react";
import { ChatContext } from "../context/ChatProvider";

const Container = styled.main`
  background-color: #000000b8;
  height: 100vh;
  flex: 2;
  color: white;
`;

const TopBar = styled.div`
  background-color: steelblue;
  padding: 0 2rem;
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.div``;
const ChatIcons = styled.div`
  display: flex;
  gap: 2rem;
  svg {
    font-size: 2.4rem;
  }
`;

const ChatBox = () => {
  const { data } = useContext(ChatContext);
  return (
    <Container>
      <TopBar>
        <UserName>{data?.user?.displayName}</UserName>
        <ChatIcons>
          <BsCameraVideoFill />
          <FaUserPlus />
          <BsThreeDots />
        </ChatIcons>
      </TopBar>
      <Messages />
      <ChatInput />
    </Container>
  );
};

export default ChatBox;
