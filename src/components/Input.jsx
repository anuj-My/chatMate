import styled from "styled-components";

const InputEl = styled.input`
  border: none;
  outline: none;
  padding: 1.5rem;
  color: #dadada;
  font-size: 1.6rem;
  background-color: transparent;
  border-bottom: 1px solid rgba(225, 225, 225, 0.5);
  /* outline-color: transparent; */
  border-radius: 0.5rem;
  width: 100%;

  &::placeholder {
    opacity: 0.7;
  }
`;

const Input = ({ ...others }) => {
  return <InputEl {...others} />;
};

export default Input;
