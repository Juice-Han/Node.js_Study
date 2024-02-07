import axios from "axios";
import { useEffect, useState } from "react";
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
  border: 1px solid gray;
  border-radius: 30px;
  padding: 20px;
  background-color: ivory;
  margin-bottom: 20px;
`;

type PostType = {
  title: string;
  content: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<PostType[]>([]);

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
              </Post>
          );
        })}
      </PostContainer>
    </Container>
  );
}
