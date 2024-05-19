import React, { useState } from "react";
import axios from "axios";

const UserPage = () => {
  let [userId, setUserId] = useState("");
  let [successList, setSuccessList] = useState([]);
  const checkSuccess = async () => {
    if (!userId) return;
    const response = await axios.get(
      `http://localhost:8080/api/checkSuccess/${userId}`
    );
    setSuccessList(response.data.rows);
  };

  let [difficulty, setDifficulty] = useState("");
  let [problemList, setProblemList] = useState([]);
  const checkSortedQuestion = async () => {
    if (!difficulty) return;
    const response = await axios.get(
      `http://localhost:8080/api/problem/${difficulty}`
    );
    setProblemList(response.data.rows);
  };

  let [problemNum, setProblemNum] = useState("");
  let [questionList, setQuestionList] = useState([]);
  let [questionCount, setQuestionCount] = useState(0);

  const checkQuestionAndComment = async () => {
    if (!problemNum) return;
    const response = await axios.get(
      `http://localhost:8080/api/problem/${problemNum}/question`
    );
    if (response.data.rows.length !== 0) {
      setQuestionList(response.data.rows);
      setQuestionCount(response.data.rows2[0].count);
    }
  };

  let [commentList, setCommentList] = useState([]);
  let [questionId, setQuestionId] = useState("");
  const checkComment = async () => {
    if (!questionId) return;
    const response = await axios.get(
      `http://localhost:8080/api/question/${questionId}/comment`
    );
    if (response.data.rows) {
      setCommentList(response.data.rows);
    }
  };

  let [everyProblemList, setEveryProblemList] = useState([]);
  const checkEveryProblem = async () => {
    const response = await axios.get("http://localhost:8080/api/problem");
    if (response.data.rows) {
      setEveryProblemList(response.data.rows);
    }
  };

  let [everyQuestionList, setEveryQuestionList] = useState([]);
  const checkEveryQuestion = async () => {
    const response = await axios.get("http://localhost:8080/api/question");
    if (response.data.rows) {
      setEveryQuestionList(response.data.rows);
    }
  };
  return (
    <>
      <span>1. 시도한 문제 확인하기 - 사용자 아이디를 입력하세요</span>
      <br />
      <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      <br />
      <button onClick={() => checkSuccess()}>확인하기</button>
      {successList.map((question, idx) => {
        return (
          <>
            <p>문제 번호: {question.problem_num}</p>
            <p>성공 여부: {question.success}</p>
          </>
        );
      })}
      <br />
      <br />

      <span>
        2. 특정 난이도의 문제 확인하기 - 난이도를 입력하세요 1~10 사이{" "}
      </span>
      <br />
      <input
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />
      <br />
      <button onClick={() => checkSortedQuestion()}>확인하기</button>
      {problemList.map((prob, idx) => {
        return (
          <>
            <p>문제 번호: {prob.problem_num}</p>
            <p>제목: {prob.title}</p>
          </>
        );
      })}
      <br />
      <br />

      <span>
        3. 특정 문제에 대한 질문 리스트 및 개수 조회 - 문제 번호를 입력하세요{" "}
      </span>
      <br />
      <input
        value={problemNum}
        onChange={(e) => setProblemNum(e.target.value)}
      />
      <br />
      <button onClick={() => checkQuestionAndComment()}>확인하기</button>
      <p>질문 개수 : {questionCount}</p>
      {questionList.map((prob, idx) => {
        return (
          <>
            <p>
              질문 {idx + 1}: {prob.title}
            </p>
          </>
        );
      })}
      <span>4. 특정 질문에 대한 답변 확인하기 - 질문 번호를 입력하세요 </span>
      <br />
      <input
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
      />
      <br />
      <button onClick={() => checkComment()}>확인하기</button>
      {commentList.map((comment, idx) => {
        return (
          <>
            <p>
              답변 {idx + 1} : {comment.content}
            </p>
          </>
        );
      })}

      <br />
      <br />
      <span>5. 모든 문제 확인하기 </span>
      <br />
      <button onClick={() => checkEveryProblem()}>확인하기</button>
      {everyProblemList.map((prob, idx) => {
        return (
          <div style={{ border: "1px solid gray" }}>
            <p>문제 번호 : {prob.problem_num}</p>
            <p>제목 : {prob.title}</p>
            <p>내용 : {prob.description}</p>
          </div>
        );
      })}

      <br />
      <br />
      <span>6. 모든 질문 확인하기 </span>
      <br />
      <button onClick={() => checkEveryQuestion()}>확인하기</button>
      {everyQuestionList.map((question, idx) => {
        return (
          <div style={{ border: "1px solid gray" }}>
            <p>질문자 id : {question.user_id}</p>
            <p>문제 번호 : {question.problem_nm}</p>
            <p>제목 : {question.title}</p>
            <p>내용 : {question.content}</p>
          </div>
        );
      })}
    </>
  );
};

export default UserPage;
