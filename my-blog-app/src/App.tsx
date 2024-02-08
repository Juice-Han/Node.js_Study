import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Write from "./pages/Write";
import Posts from "./pages/Posts";
import Rewrite from "./pages/Rewrite";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/write" element={<Write />} />
        <Route path="/posts/rewrite/:id" element={<Rewrite />} />
      </Routes>
    </>
  );
}

export default App;
