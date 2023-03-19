import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserProvider";
import { signUserOut } from "../firebase/firebaseAuth";

const HeadContainer = styled.nav`
  background-color: #181818;
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 2.8rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const Image = styled.img`
  background-color: #ffffff79;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;
const Name = styled.div``;

const Btn = styled.button`
  font-size: 1.4rem;
  color: #ededed;
  border: none;
  background-color: steelblue;
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <HeadContainer>
      <Logo>ChatMe</Logo>
      <ProfileContainer>
        <Profile>
          <Image src={currentUser?.photoURL} alt={currentUser?.displayName} />
          <Name>{currentUser?.displayName}</Name>
        </Profile>
        <Btn type="button" onClick={signUserOut}>
          Sign Out
        </Btn>
      </ProfileContainer>
    </HeadContainer>
  );
};

export default Navbar;
