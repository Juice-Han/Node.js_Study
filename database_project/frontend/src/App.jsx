import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ModeSelect from "./ModeSelect";
import AdminUserPage from "./AdminUserPage";
import UserPage from "./UserPage";
import AdminSelectPage from "./AdminSelectPage";
import AdminProblemPage from "./AdminProblemPage";
import AdminUserProblemPage from "./AdminUserProblemPage";
import AdminQuestionPage from "./AdminQuestionPage";
import AdminCommentPage from "./AdminCommentPage";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<ModeSelect />}></Route>
        <Route path="/admin" element={<AdminSelectPage/>}></Route>
        <Route path="/admin/user" element={<AdminUserPage/>}></Route>
        <Route path="/admin/problem" element={<AdminProblemPage/>}></Route>
        <Route path="/admin/userProblem" element={<AdminUserProblemPage/>}></Route>
        <Route path="/admin/question" element={<AdminQuestionPage/>}></Route>
        <Route path="/admin/comment" element={<AdminCommentPage/>}></Route>

        <Route path="/user" element={<UserPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
