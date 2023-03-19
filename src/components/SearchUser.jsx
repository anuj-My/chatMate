import { useContext, useState } from "react";
import styled from "styled-components";
import {
  collection,
  query,
  where,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { UserContext } from "../context/UserProvider";
import Input from "./Input";

const Container = styled.section``;

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
  font-weight: 500;
  text-transform: capitalize;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  background-color: #ffffff79;
  border-radius: 50%;
`;
const UserChatInfo = styled.div``;

const SearchUser = () => {
  const { currentUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const reset = () => {
    setUsername("");
  };

  const handleSearch = async () => {
    const citiesRef = collection(db, "users");

    const q = query(citiesRef, where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        reset();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleClick = async () => {
    // check weather the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create a chat in chats  collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        console.log("click");
        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUser(null);
  };

  return (
    <Container>
      <Input
        type="search"
        placeholder="find a user"
        value={username}
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
      />
      {user && (
        <UserChat onClick={handleClick}>
          <Image src={user?.photoURL} alt={user?.displayName} />
          <UserChatInfo>
            <Name>{user?.displayName}</Name>
          </UserChatInfo>
        </UserChat>
      )}
    </Container>
  );
};

export default SearchUser;
