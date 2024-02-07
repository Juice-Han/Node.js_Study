import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <div>
        <h4>글 제목</h4>
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
        <button>저장하기</button>
      </div>
    </div>
  );
}
