import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Form, Input, Button } from "antd";

import { AuthContext } from "../../context/authContext";
const initialState = {
  username: "",
  password: "",
  err: "",
  success: "",
};

const LoginForm = (props) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [user, setUser] = useState(initialState);

  const { username, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      const res = await axios.post("/api/login", { username, password });
      setUser({
        ...user,
      });

      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({
          ...user,
          err: err.response.data.msg,
          success: "",
        });
    }
  };
  return (
    <FormWrapper>
      <h1 style={{ backgroundColor: "blue", color: "white", padding: "5px" }}>
        Member Login
      </h1>
      <Form initialValues={{ remember: true }} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          value={username}
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input type="text" placeholder=" Username" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            type="password"
            placeholder=" Password"
            value={password}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="btn-submit " htmlType="submit">
            <span>Log in</span>
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  text-align: center;
  margin: 0 auto;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;

  .ant-form- {
    background-color: #fff;
    border-color: #000;
    width: 100%;
    max-width: 700px;
  }
  .ant-input {
    padding: 10px 0;
    margin: 5px 0;
    width: 100%;
    border: none;
    background-color: lightgray;
    color: #000 !important;
    outline: none;
  }

  .ant-btn {
    width: 100%;
    letter-spacing: 0.42px;
    transform: scale(1);
    background-color: blue;
    border-color: blue;
    color: #fff;
    padding: 5px 10px;
    min-width: 500px;

    > span {
      font-size: 16px;
    }
  }
`;
