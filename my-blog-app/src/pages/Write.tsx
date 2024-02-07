import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WritingBox = styled.div`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: 90%;
  height: 70%;

  & p {
    margin: 10px 0;
  }

  & input,
  & textarea {
    border: 0.5px solid gray;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 16px;
  }

  :nth-child(2) {
    width: 100%;
    height: 10%;
    padding-left: 10px;
  }

  :nth-child(4) {
    width: 100%;
    height: 60%;
    box-sizing: border-box;
    padding: 10px;
    text-align: start;
    resize: none;
  }
`;

const Button = styled.button<{ $w: number; $h: number }>`
  width: ${(props) => props.$w}px;
  height: ${(props) => props.$h}px;
  background-color: black;
  color: white;
  text-align: center;
  margin: 0 10px;
`;

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const savePost = async () => {
    try {
      const data = {
        title: title,
        content: content,
      };
      await axios.post("http://localhost:8080/post", data, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/posts");
    } catch (e: any) {
      console.log(e);
      navigate("/");
    }
  };

  return (
    <div>
      <Container>
        <WritingBox>
          <InputWrapper>
            <p>글 제목</p>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <p>글 내용</p>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </InputWrapper>
          <Button
            $w={100}
            $h={50}
            onClick={() => {
              savePost();
            }}
          >
            저장
          </Button>
        </WritingBox>
      </Container>
    </div>
  );
}
