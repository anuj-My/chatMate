import { useContext } from "react";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { BsCameraVideoFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { ChatContext } from "../context/ChatProvider";
import { MobileContext } from "../context/MobileProvider";

const Container = styled.main`
  background-color: #000000b8;
  height: 100vh;
  width: 70%;
  color: white;
  transition: all 0.2s ease;

  @media screen and (max-width: 768px) {
    width: ${({ onMobile }) => (onMobile ? "100%" : "0")};
    display: ${({ onMobile }) => (onMobile ? "block" : "none")};
  }
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

const TopLeft = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
const Back = styled.div`
  background-color: #9ad2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  transition: all 0.4s ease;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    display: none;
  }
  &:hover {
    background-color: #6bbafb;
  }
  svg {
    font-size: 2rem;
  }
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
  const { onMobile, setOnMobile } = useContext(MobileContext);
  const { data } = useContext(ChatContext);

  return (
    <Container onMobile={onMobile}>
      <TopBar>
        <TopLeft>
          <Back onClick={() => setOnMobile(false)}>
            <BiArrowBack />
          </Back>
          <UserName>{data?.user?.displayName}</UserName>
        </TopLeft>
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
