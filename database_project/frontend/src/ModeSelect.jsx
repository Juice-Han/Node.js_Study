import React from 'react'
import { useNavigate } from 'react-router-dom'

const ModeSelect = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=>navigate('/admin')}>관리자 모드</button>
        <button onClick={()=>navigate('/user')}>사용자 모드</button>
    </div>
  )
}

export default ModeSelect