import React, { useState } from "react";
import axios from "axios";

const AdminQuestionPage = () => {
  const getQuestion = async () => {
    const response = await axios.get("http://localhost:8080/question");
    setQuestionList(response.data.rows);
  };

  const insertQuestion = async () => {
    const response = await axios.post("http://localhost:8080/question", {
      user_id: userId,
      problem_num: problemNum,
      title: title,
      content: content,
    });
    if (response.status === 200) {
      await getQuestion();
    }
    setUserId("");
    setProblemNum("");
    setTitle("");
    setContent("");
  };

  const putQuestion = async () => {
    const response = await axios.put(
      `http://localhost:8080/question/${questionId}`,
      {
        title: title,
        content: content,
      }
    );
    if (response.status === 200) {
      await getQuestion();
    }
    setUserId("");
    setProblemNum("");
    setSuccess("");
    setButtonToggle(true);
  };

  const deleteQuestion = async (questionId) => {
    const response = await axios.delete(
      `http://localhost:8080/question/${questionId}`
    );
    if (response.status === 200) {
      await getQuestion();
    }
  };

  let [questionList, setQuestionList] = useState([]);
  let [userId, setUserId] = useState("");
  let [problemNum, setProblemNum] = useState("");
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [questionId, setQuestionId] = useState("");
  let [buttonToggle, setButtonToggle] = useState(true);

  return (
    <>
      <button onClick={() => getQuestion()}>질문 조회</button>
      {buttonToggle ? (
        <button onClick={() => insertQuestion()}>질문 삽입</button>
      ) : (
        <button onClick={() => putQuestion()}>질문 수정</button>
      )}

      <p>질문자 id</p>
      <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      <br />
      <p>문제 번호</p>
      <input
        value={problemNum}
        onChange={(e) => setProblemNum(e.target.value)}
      />
      <p>제목</p>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <p>내용</p>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <h4>문제 리스트</h4>
      {questionList.map((data, idx) => {
        return (
          <div style={{ border: "1px solid gray", marginBottom: "10px" }}>
            <p>질문자 id : {data.user_id}</p>
            <p>문제 번호 : {data.problem_num}</p>
            <p>제목 : {data.title}</p>
            <p>내용 : {data.content}</p>
            <button
              onClick={() => {
                setUserId(data.user_id);
                setQuestionId(data.question_id)
                setProblemNum(data.problem_num);
                setTitle(data.title);
                setContent(data.content);
                setButtonToggle(false);
              }}
            >
              수정
            </button>
            <button onClick={() => deleteQuestion(data.question_id)}>
              삭제
            </button>
          </div>
        );
      })}
    </>
  );
};

export default AdminQuestionPage;
