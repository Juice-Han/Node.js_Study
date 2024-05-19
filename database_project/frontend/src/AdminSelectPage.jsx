import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSelect = () => {
    const navigate = useNavigate()
  return (
    <>
        <button onClick={()=>navigate('/admin/user')}>유저 관리</button>
        <br/>
        <button onClick={()=>navigate('/admin/problem')}>문제 관리</button>
        <br/>
        <button onClick={()=>navigate('/admin/userProblem')}>유저-문제 관리</button>
        <br/>
        <button onClick={()=>navigate('/admin/question')}>질문 관리</button>
        <br/>
        <button onClick={()=>navigate('/admin/comment')}>답변 관리</button>
    </>
  )
}

export default AdminSelect