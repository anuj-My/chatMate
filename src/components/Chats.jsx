import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import { UserContext } from "../context/UserProvider";
import { db } from "../firebase/firebaseConfig";
import { ChatContext } from "../context/ChatProvider";
const ChatList = styled.section``;

const UserChat = styled.div`
  padding: 2rem;
  font-size: 1.6rem;
  align-items: center;
  display: flex;
  gap: 2rem;
  /* border-bottom: 1px solid #ffffff56; */
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #ffffff1a;
  }
`;

const Name = styled.span`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  text-transform: capitalize;
`;
const Message = styled.p`
  font-size: 1.4rem;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  background-color: #ffffff79;
  border-radius: 50%;
`;
const UserChatInfo = styled.div``;

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <ChatList>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <UserChat
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <Image
                src={chat[1]?.userInfo?.photoURL}
                alt={chat[1]?.userInfo?.displayName}
              />
              <UserChatInfo>
                <Name>{chat[1]?.userInfo?.displayName}</Name>
                <Message>{chat[1]?.lastMessage?.text}</Message>
              </UserChatInfo>
            </UserChat>
          );
        })}
    </ChatList>
  );
};

export default Chats;
