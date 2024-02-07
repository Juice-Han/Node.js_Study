import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const savePost = async () => {
    try {
      const data = {
        title: title,
        content: content,
      }
      await axios.post(
        "http://localhost:8080/post",
        data,
        {
          headers: {'Content-Type' : 'application/json'}
        },
      );
      navigate('/posts');
    } catch (e: any) {
      console.log(e);
      navigate('/');
    }
    
  };

  return (
    <div>
      <div>
        <p>글 제목</p>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <p>글 내용</p>
        <input
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button
          onClick={() => {
            savePost();
          }}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
