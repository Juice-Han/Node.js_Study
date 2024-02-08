import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: black;
  color: white;
  margin: 0 10px;
  border: none;

  &:hover {
    cursor: pointer;
  };
`

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Button onClick={()=>{navigate('/posts/write')}}>글 쓰기</Button>
      <Button onClick={()=>{navigate('/posts')}}>글 목록</Button>
    </Container>
  );
}
