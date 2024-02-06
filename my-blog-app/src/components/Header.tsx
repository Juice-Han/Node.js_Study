import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="w-full h-16 bg-slate-900 flex items-center">
        <div className="w-44 h-9 text-2xl text-white ml-3">
          <span onClick={()=>{navigate('/')}}>Juice-Han Blog</span>
        </div>
        <div className="text-lg text-slate-200 ml-2">
          <span onClick={()=>{navigate('/write')}}>글쓰기</span>
        </div>
        <div className="text-lg text-slate-200 ml-2">
          <span onClick={()=>{navigate('/posts')}}>글목록</span>
        </div>
      </div>
    </div>
  );
}

export default Header;