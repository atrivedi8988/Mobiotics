import React, { useEffect, useState } from "react";
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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditModal({ isOpen, onOpen, onClose }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [formstate, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const handleUserProfile = ()=>{
    axios
    .get("https://mobiotics.up.railway.app/api/user/profile")
    .then((res) => {
      setUserInfo(res.data);
    });
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleEdit = async(id) => {
    try {
      let res = await axios.put(
        `https://mobiotics.up.railway.app/api/user/update/${id}`,
        userInfo
      );
      alert(res.data.message);
      navigate("/profile");
      handleUserProfile()
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
   handleUserProfile()
  }, []);

  console.log(userInfo);
  // console.log(formstate.name);

  return (
    <>
      <Box onClick={onOpen}>Edit Profile</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="5px">
              <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Editable defaultValue={userInfo.name}>
                  <EditablePreview
                    width={"100%"}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                  <EditableInput
                    type={"text"}
                    name="name"
                    onChange={handleChange}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                </Editable>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Editable defaultValue={userInfo.email}>
                  <EditablePreview
                    width={"100%"}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                  <EditableInput
                    type={"email"}
                    name="email"
                    onChange={handleChange}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                </Editable>
              </FormControl>
              {/* <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Editable defaultValue={"password"}>
                  <EditablePreview
                    width={"100%"}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                  <EditableInput
                    type={"text"}
                    name="password"
                    onChange={handleChange}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                </Editable>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Editable defaultValue={"password"}>
                  <EditablePreview
                    width={"100%"}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                  <EditableInput
                    type={"text"}
                    name="password"
                    onChange={handleChange}
                    border={"1px solid blue"}
                    borderRadius={"10px"}
                    pl={"20px"}
                  />
                </Editable>
              </FormControl> */}
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
              onClick={()=>handleEdit(userInfo._id)}
              //   isLoading={picLoading}
            >
              UPDATE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditModal;
