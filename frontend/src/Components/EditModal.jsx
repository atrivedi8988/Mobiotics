import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function EditModal({ isOpen, onOpen, onClose }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const [formstate, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
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
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleEdit = () => {
    console.log("click");
  };

  return (
    <>
      <Box onClick={onOpen}>
        Edit Profile
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                  onChange={handleChange}
                  name="pic"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              //   isLoading={picLoading}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditModal;
