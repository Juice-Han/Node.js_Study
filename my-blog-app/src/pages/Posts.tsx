import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PostContainer = styled.div`
  width: 80%;
  height: 100vh;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Post = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid gray;
  white-space: pre-line;
  & > button {
    width: 40px;
    height: 20px;
    border: none;
    background-color: black;
    color: white;
    margin-right: 10px;
  }
`;

type PostType = {
  _id: string;
  title: string;
  content: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const navigate = useNavigate();

  const rewritePost = (id : string) => {
    navigate(`/posts/rewrite/${id}`)
  }

  const deletePost = async (id: string, idx: number) => {
    try{
      const response = await axios.delete(`http://localhost:8080/post/${id}`)
      if(response.status === 200){
        let tmpPosts = [...posts];
        tmpPosts.splice(idx,1);
        setPosts(tmpPosts);
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:8080/post");
      console.log(response.data);
      setPosts(response.data);
    };
    getPosts();
  }, []);
  return (
    <Container>
      <PostContainer>
        {posts.map((element, idx) => {
          return (
              <Post key={idx}>
                <h2>{element.title}</h2>
                <p>{element.content}</p>
                <button onClick={()=>{rewritePost(element._id)}}>수정</button>
                <button onClick={()=>{deletePost(element._id, idx)}}>삭제</button>
              </Post>
          );
        })}
      </PostContainer>
    </Container>
  );
}
