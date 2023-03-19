import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../context/ChatProvider";
import { db } from "../firebase/firebaseConfig";
import Message from "./Message";

const Container = styled.section`
  padding: 1rem;
  height: calc(100% - 18rem);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1rem;
    background-color: #172026;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: steelblue;
    border-radius: 5px;
  }
`;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <Container>
      {messages?.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </Container>
  );
};

export default Messages;
