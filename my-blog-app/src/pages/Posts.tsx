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
  height: 150px;
  box-sizing: border-box;
  border-radius: 30px;
  box-shadow: 2px 2px 2px gray;
  padding: 20px;
  background-color: lightgoldenrodyellow;
  margin-bottom: 20px;

  & > button {
    width: 40px;
    height: 20px;
    border: none;
    background-color: black;
    color: white;
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

  const goToRewrite = (id : string) => {
    navigate(`/posts/rewrite/${id}`)
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
                <button onClick={()=>{goToRewrite(element._id)}}>수정</button>
              </Post>
          );
        })}
      </PostContainer>
    </Container>
  );
}
