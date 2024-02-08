import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: black;
  display: flex;
  align-items: center;
`

const LogoTitle = styled.div`
  width: 180px;
  height: 30px;
  font-size: 24px;
  font-weight: 600;
  color: white;
  text-align: center;
`

const NavItem = styled.div`
  width: 60px;
  height: 20px;
  font-size: 16px;
  color: white;
  margin-left: 10px;
`

function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <LogoTitle onClick={()=>{navigate('/')}}>JuiceHan Blog</LogoTitle>
      <NavItem onClick={()=>{navigate('/posts/write')}}>글 쓰기</NavItem>
      <NavItem onClick={()=>{navigate('/posts')}}>글 목록</NavItem>
    </Container>
  );
}

export default Header;
