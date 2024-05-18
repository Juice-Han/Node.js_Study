import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ModeSelect from "./ModeSelect";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<ModeSelect />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
