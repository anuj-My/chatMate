import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../firebase/firebaseAuth";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage } from "../firebase/firebaseConfig";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { doc, setDoc } from "firebase/firestore";

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1d1d;
`;

const FormWrapper = styled.div`
  background-color: #3e3e3e;
  padding: 4rem;
  border-radius: 0.7rem;
`;

const Head = styled.span`
  font-size: 2rem;
  display: inline-block;
  margin-bottom: 2rem;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  svg {
    font-size: 3.2rem;
    cursor: pointer;
  }

  span {
    cursor: pointer;
    color: #ffffff6c;
    font-size: 12px;
  }
`;

const Span = styled.p`
  color: white;
  margin-top: 3rem;
  display: inline-block;
  font-size: 1.6rem;
  text-align: center;

  a {
    color: #b1b1f6;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const defaultInput = {
    displayName: "",
    email: "",
    password: "",
  };

  const [inputFields, setInputFields] = useState(defaultInput);

  const { email, password, displayName } = inputFields;
  console.log(inputFields);
  const reset = () => {
    setInputFields(defaultInput);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const file = e.target[3].files[0];

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      const uploadTask = uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // update profile
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });

            // create user

            await createUserDocumentFromAuth(user, {
              displayName,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", user.uid), {});
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        });
      });

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container onSubmit={submitHandler}>
      <FormWrapper>
        <Head>Sign Up With Email and Password!</Head>
        <Form>
          <Input
            type="text"
            label="Full Name"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            required
            onChange={changeHandler}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={changeHandler}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            value={password}
            placeholder="Password"
            required
            onChange={changeHandler}
          />

          <Input
            type="file"
            id="file"
            name="file"
            style={{ display: "none" }}
          />
          <Label htmlFor="file">
            <FcAddImage /> <span>Add an Avatar</span>
          </Label>

          <Button title="Sign Up" type="submit" />
        </Form>
        <Span>
          Already have an accout?
          <Link to="/sign-in">Sign In</Link>
        </Span>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;
