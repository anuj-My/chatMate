import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUserWithEmailAndPassword } from "../firebase/firebaseAuth";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";

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

const SignIn = () => {
  const navigate = useNavigate();
  const defaultInput = {
    email: "",
    password: "",
  };

  const [inputFields, setInputFields] = useState(defaultInput);

  const { email, password } = inputFields;

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

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      console.log(user);
      navigate("/");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Head>Sign In With Email and Password!</Head>
        <Form onSubmit={submitHandler}>
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

          <Button title="Sign In" />
        </Form>
        <Span>
          You don't have an accout?
          <Link to="/sign-up">Register</Link>
        </Span>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
