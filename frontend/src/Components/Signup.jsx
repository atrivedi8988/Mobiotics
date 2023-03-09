import {
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formstate, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic : ""
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState({
      ...formstate,
      [name]: value 
    });
  };
  const submitHandler = async () => {
    setLoading(true);
    try {
      let res = await axios.post(
        "https://mobiotics.up.railway.app/api/user/create",
        formstate
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      alert(res.data.message);
      navigate("/profile");
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
    console.log(formstate)
  };

  const postImage = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      alert(" i am Please select Image");
      setLoading(false);
      return;
    }
    // console.log(formstate.pic[0])
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chit-chat-app");
      data.append("cloud_name", "dwecsqtkp");
      fetch("https://api.cloudinary.com/v1_1/dwecsqtkp/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((dat) => {
          console.log(dat.url.toString())
          setFormState({
            ...formstate,
            pic : dat.url.toString()
          })
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      alert("or mai Please select Image");
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            name="name"
            onChange={handleChange}
          />
        </FormControl>
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
        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e)=>postImage(e.target.files[0])}
            name="pic"
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          isLoading={loading}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
}

export default Signup;
