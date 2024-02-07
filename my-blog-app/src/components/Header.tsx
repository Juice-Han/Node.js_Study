import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  width: 100%;
  height: 40px;
  background-color: gray;
`

function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      
    </Container>
  );
}

export default Header;
