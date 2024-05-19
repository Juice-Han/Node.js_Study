import React, { useState } from 'react'
import axios from 'axios'

const AdminCommentPage = () => {

  let [commentList, setCommentList] = useState([])
  let [commentId, setCommentId] = useState('')
  let [questionId, setQuestionId] = useState('')
  let [userId, setUserId] = useState('')
  let [content, setContent] = useState('')
  let [buttonToggle, setButtonToggle] = useState(true);

  const getComment = async () => {
    const response = await axios.get("http://localhost:8080/comment");
    setCommentList(response.data.rows);
  };

  const insertComment = async () => {
    const response = await axios.post("http://localhost:8080/comment", {
      question_id: questionId,
      user_id: userId,
      content: content
    });
    if (response.status === 200) {
      await getComment();
    }
    setQuestionId("");
    setUserId("");
    setContent("");
  };

  const putComment = async () => {
    const response = await axios.put(
      `http://localhost:8080/comment/${commentId}`,
      {
        content: content,
      }
    );
    if (response.status === 200) {
      await getComment();
    }
    setQuestionId("");
    setUserId("");
    setContent("");
    setButtonToggle(true);
  };

  const deleteComment = async (comment_id) => {
    const response = await axios.delete(
      `http://localhost:8080/comment/${comment_id}`
    );
    if (response.status === 200) {
      await getComment();
    }
  };

  return (
    <>
      <button onClick={() => getComment()}>댓글 조회</button>
      {buttonToggle ? (
        <button onClick={() => insertComment()}>댓글 삽입</button>
      ) : (
        <button onClick={() => putComment()}>댓글 수정</button>
      )}

      <p>질문 id</p>
      <input value={questionId} onChange={(e) => setQuestionId(e.target.value)} />
      <br />
      <p>유저 id</p>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <p>내용</p>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <h4>댓글 리스트</h4>
      {commentList.map((data, idx) => {
        return (
          <div style={{ border: "1px solid gray", marginBottom: "10px" }}>
            <p>질문 id : {data.question_id}</p>
            <p>유저 id : {data.user_id}</p>
            <p>댓글 내용 : {data.content}</p>
            <button
              onClick={() => {
                setCommentId(data.comment_id)
                setQuestionId(data.question_id)
                setUserId(data.user_id);
                setContent(data.content);
                setButtonToggle(false);
              }}
            >
              수정
            </button>
            <button onClick={() => deleteComment(data.comment_id)}>
              삭제
            </button>
          </div>
        );
      })}
    </>
  )
}

export default AdminCommentPage