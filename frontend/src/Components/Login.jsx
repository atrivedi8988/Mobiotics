import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const [formstate, setFormState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formstate,
      [name]: value,
    });
  };
  const submitHandler = async () => {
    try {
      let res = await axios.post(
        "https://mobiotics-backend-production.up.railway.app/api/user/login",
        formstate
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      alert(res.data.message);
      navigate("/profile");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      let res = await axios.post("/api/user/forgot", {
        email: formstate.email,
      });
      alert(res.data.message)
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email Address"
            name="email"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Text
          onClick={handleForgotPassword}
          color="blue"
          width={"100%"}
          textAlign={"right"}
          _hover={{ cursor: "pointer", textDecor: "underline" }}
        >
          forgot password
        </Text>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          //   isLoading={picLoading}
        >
          Login
        </Button>
      </VStack>
    </>
  );
}

export default Login;
