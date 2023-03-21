import { useContext, useState } from "react";
import styled from "styled-components";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import Input from "./Input";
import { FcAddImage } from "react-icons/fc";
import { IoMdAttach } from "react-icons/io";
import Button from "./Button";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/firebaseConfig";
import { UserContext } from "../context/UserProvider";
import { ChatContext } from "../context/ChatProvider";

const Container = styled.div`
  padding: 0 2rem;
  width: 100%;
  background-color: #dbdbdb;
  height: 9rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Send = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: grey;
    font-size: 2.5rem;
    cursor: pointer;
  }
  label {
    svg {
      font-size: 3.5rem;
    }
  }
`;

const ChatInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          color: "#212121",
          borderColor: "#212121",
          fontSize: "1.8rem",
        }}
      />

      <Send>
        <IoMdAttach />
        <Input
          type="file"
          style={{ display: "none" }}
          id="file"
          // value={img}
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label htmlFor="file">
          <FcAddImage />
        </label>

        <Button title="Send" onClick={handleSend} />
      </Send>
    </Container>
  );
};

export default ChatInput;
