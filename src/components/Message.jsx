import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatContext } from "../context/ChatProvider";
import { UserContext } from "../context/UserProvider";

const Container = styled.section`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  flex-direction: ${({ owner }) => (owner ? "row-reverse" : "row")};

  div:last-child {
    background-color: ${({ owner }) => (owner ? "steelblue" : "white")};
    border-radius: ${({ owner }) =>
      owner ? "1rem 0rem 1rem 1rem" : "0rem 1rem 1rem 1rem"};
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  span {
    color: #ffffff76;
  }
`;

const Image = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #ffffff76;
  object-fit: cover;
`;
const MessageContent = styled.div`
  max-width: 70%;
  background-color: white;
  color: black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0rem 1rem 1rem 1rem;

  p {
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Message = ({ message }) => {
  const ref = useRef();

  const { currentUser } = useContext(UserContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  return (
    <Container
      ref={ref}
      owner={message.senderId === currentUser.uid ? true : false}
    >
      <User>
        <Image
          src={
            message?.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data?.user?.photoURL
          }
          alt={
            message?.senderId === currentUser?.uid
              ? currentUser?.displayName
              : data?.user?.displayName
          }
        />
        <span>just now</span>
      </User>
      <MessageContent>
        <p>{message?.text}</p>
        {message.img && <img src={message?.img} alt="" />}
      </MessageContent>
    </Container>
  );
};

export default Message;
