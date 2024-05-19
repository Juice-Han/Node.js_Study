import React, { useState } from 'react'
import axios from "axios";

const AdminUserProblemPage = () => {

  const getUP = async () => {
    const response = await axios.get("http://localhost:8080/userProblem");
    setUPList(response.data.rows);
  };

  const insertUP = async () => {
    const response = await axios.post('http://localhost:8080/userProblem',{
        user_id: userId,
        problem_num: problemNum,
        success: success
    })
    if(response.status === 200){
        await getUP();
    }
    setUserId('')
    setProblemNum('')
    setSuccess('')
  }

  const putUP = async () => {
    const response = await axios.put('http://localhost:8080/userProblem',{
        user_id: userId,
        problem_num: problemNum,
        success: success
    })
    if(response.status === 200){
        await getUP();
    }
    setUserId('')
    setProblemNum('')
    setSuccess('')
    setButtonToggle(true)
  }

  const deleteUP = async (user_id,problem_num) => {
    const response = await axios.delete(`http://localhost:8080/userProblem/${user_id}/${problem_num}`)
    if(response.status === 200){
        await getUP();
    }
  }

  let [upList, setUPList] = useState([])
  let [userId, setUserId] = useState('')
  let [problemNum, setProblemNum] = useState('')
  let [success, setSuccess] = useState('')
  const [buttonToggle, setButtonToggle] = useState(true);
  return (
    <>
      <button onClick={() => getUP()}>유저-문제 조회</button>
      {
        buttonToggle ? <button onClick={()=> insertUP()}>유저-문제 삽입</button>
        : <button onClick={()=> putUP()}>유저-문제 수정</button>
      }
      
      <p>유저 id</p>
      <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      <br />
      <p>문제 번호</p>
      <input value={problemNum} onChange={(e) => setProblemNum(e.target.value)} />
      <p>성공 여부</p>
      <input value={success} onChange={(e) => setSuccess(e.target.value)} />
      <h4>유저-문제 리스트</h4>
      {upList.map((data, idx) => {
        return (
          <div style={{ border: "1px solid gray", marginBottom: "10px" }}>
            <p>유저 id : {data.user_id}</p>
            <p>문제 번호 : {data.problem_num}</p>
            <p>성공 여부 : {data.success}</p>
            <button onClick={()=>{
                setUserId(data.user_id)
                setProblemNum(data.problem_num)
                setSuccess(data.success)
                setButtonToggle(false)
            }}>수정</button>
            <button onClick={()=>deleteUP(data.user_id, data.problem_num)}>삭제</button>
          </div>
        );
      })}
    </>
  );
}

export default AdminUserProblemPage