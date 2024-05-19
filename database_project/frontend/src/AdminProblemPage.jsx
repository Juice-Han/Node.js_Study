import React, { useState } from "react";
import axios from "axios";
const AdminProblemPage = () => {
  let [problemList, setProblemList] = useState([]);

  const getProblem = async () => {
    const response = await axios.get("http://localhost:8080/problem");
    setProblemList(response.data.rows);
  };

  const insertProblem = async () => {
    const response = await axios.post('http://localhost:8080/problem',{
        title: problemTitle,
        description: problemDesc,
        difficulty: problemDiff
    })
    if(response.status === 200){
        await getProblem();
    }
    setProblemTitle('')
    setProblemDesc('')
    setProblemDiff(0)
  }

  const putProblem = async () => {
    const response = await axios.put(`http://localhost:8080/problem/${problemNum}`,{
        title: problemTitle,
        description: problemDesc,
        difficulty: problemDiff
    })
    if(response.status === 200){
        await getProblem();
    }
    setProblemTitle('')
    setProblemDesc('')
    setProblemDiff(0)
    setButtonToggle(true)
  }

  const deleteProblem = async (problem_num) => {
    const response = await axios.delete(`http://localhost:8080/problem/${problem_num}`)
    if(response.status === 200){
        await getProblem();
    }
  }

  let [problemNum, setProblemNum] = useState(0)
  let [problemTitle, setProblemTitle] = useState('')
  let [problemDesc, setProblemDesc] = useState('')
  let [problemDiff, setProblemDiff] = useState(0)
  const [buttonToggle, setButtonToggle] = useState(true);
  return (
    <>
      <button onClick={() => getProblem()}>문제 조회</button>
      {
        buttonToggle ? <button onClick={()=> insertProblem()}>문제 삽입</button>
        : <button onClick={()=> putProblem()}>문제 수정</button>
      }
      
      <p>문제 제목</p>
      <input value={problemTitle} onChange={(e) => setProblemTitle(e.target.value)} />
      <br />
      <p>문제 내용</p>
      <input value={problemDesc} onChange={(e) => setProblemDesc(e.target.value)} />
      <p>난이도</p>
      <input value={problemDiff} onChange={(e) => setProblemDiff(e.target.value)} />
      <h4>문제 리스트</h4>
      {problemList.map((prob, idx) => {
        return (
          <div style={{ border: "1px solid gray", marginBottom: "10px" }}>
            <p>문제 번호 : {prob.problem_num}</p>
            <p>제목 : {prob.title}</p>
            <p>설명 : {prob.description}</p>
            <p>난이도 : {prob.difficulty}</p>
            <button onClick={()=>{
                setProblemNum(prob.problem_num)
                setProblemTitle(prob.title)
                setProblemDesc(prob.description)
                setProblemDiff(prob.difficulty)
                setButtonToggle(false)
            }}>수정</button>
            <button onClick={()=>deleteProblem(prob.problem_num)}>삭제</button>
          </div>
        );
      })}
    </>
  );
};

export default AdminProblemPage;
