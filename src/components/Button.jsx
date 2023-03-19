import styled from "styled-components";

const Btn = styled.button`
  border: none;
  border-radius: 0.5rem;
  padding: 1.4rem;
  font-size: 1.6rem;
  color: white;
  background-color: #5d91f1;
  cursor: pointer;
`;

const Button = ({ title, ...otherProps }) => {
  return <Btn {...otherProps}>{title}</Btn>;
};

export default Button;
