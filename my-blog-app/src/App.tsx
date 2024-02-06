import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Write from "./components/Write";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/write" element={<Write />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
