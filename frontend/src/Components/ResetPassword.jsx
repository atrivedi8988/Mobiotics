import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Button,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { id, token } = useParams();
  const [formstate, setFormState] = useState({
    password: "",
    confirmPassword: ""
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState({
      ...formstate,
      [name]: value || files[0],
    });
  };
  const submitHandler = async () => {
    try {
      let res = await axios.patch(
        `https://mobiotics.up.railway.app/api/user/reset/${id}/${token}`,
        formstate
      );
      alert(res.data.message);
      if(res.data.success){
        navigate("/")
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
 
  return (
    <VStack width={"40%"} margin="auto" mt={"30px"}>
      <Heading>Reset Your Password</Heading>
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
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        //   isLoading={picLoading}
      >
        Submit
      </Button>
    </VStack>
  );
}

export default ResetPassword;
