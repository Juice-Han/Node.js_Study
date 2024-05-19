import React, { useState } from "react";
import axios from "axios";

const AdminUserPage = () => {
  const [userInfo, setUserInfo] = useState([]);

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [usersUser_Id, setUsersUser_id] = useState(0);
  const [buttonToggle, setButtonToggle] = useState(true);

  const getUserList = async () => {
    const response = await axios.get("http://localhost:8080/user");
    if (response.status === 200) {
      setUserInfo(response.data.rows);
    }
  };

  const insertUser = async () => {
    const response = await axios.post("http://localhost:8080/user", {
      id: userId,
      password: userPw,
      name: userName,
      phone_num: userPhone,
    });
    if (response.status === 200) {
      await getUserList();
    }
  };

  const putUser = async () => {
    const response = await axios.put(
      `http://localhost:8080/user/${usersUser_Id}`,
      {
        id: userId,
        password: userPw,
        name: userName,
        phone_num: userPhone,
      }
    );
    if (response.status === 200) {
      await getUserList();
      setButtonToggle(true);
      setUserId('');
      setUserPw('');
      setUserName('');
      setUserPhone('');
    }
  };

  const deleteUser = async (user_id, idx) => {
    const response = await axios.delete(
      `http://localhost:8080/user/${user_id}`
    );
    if (response.status === 200) {
      let tmpUserInfo = [...userInfo];
      tmpUserInfo.splice(idx, 1);
      setUserInfo(tmpUserInfo);
    }
  };

  return (
    <>
      <button onClick={() => getUserList()}>유저 조회</button>
      {buttonToggle ? (
        <button onClick={() => insertUser()}>유저 삽입</button>
      ) : (
        <button onClick={() => putUser()}>유저 수정</button>
      )}

      <br></br>
      <p>아이디</p>
      <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      <br />
      <p>비밀번호</p>
      <input value={userPw} onChange={(e) => setUserPw(e.target.value)} />
      <p>이름</p>
      <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      <p>전화번호</p>
      <input value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
      <h4>유저 리스트</h4>
      {userInfo.map((user, idx) => {
        return (
          <div
            key={idx}
            style={{ border: "1px solid gray", marginBottom: "10px" }}
          >
            <p>아이디: {user.id}</p>
            <p>비밀번호: {user.password}</p>
            <p>이름: {user.name}</p>
            <p>전화번호: {user.phone_num}</p>
            <button
              onClick={() => {
                setButtonToggle(false);
                setUsersUser_id(user.user_id);
                setUserId(user.id);
                setUserPw(user.password);
                setUserName(user.name);
                setUserPhone(user.phone_num);
              }}
            >
              수정
            </button>
            <button onClick={() => deleteUser(user.user_id, idx)}>삭제</button>
          </div>
        );
      })}
    </>
  );
};

export default AdminUserPage;
