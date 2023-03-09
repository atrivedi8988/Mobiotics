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
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [formstate, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const handleUserProfile = () => {
    axios
      .get("https://mobiotics.up.railway.app/api/user/profile")
      .then((res) => {
        setUserInfo(res.data);
      });
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleEdit = (id) => {
    axios
      .put(`https://mobiotics.up.railway.app/api/user/update/${id}`, userInfo)
      .then((res) => {
        alert(res.data.message);
        navigate("/profile");
        onClose();
      })
      .then(() => {
        handleUserProfile();
        window.location.reload()
      })
      .catch((error) => alert(error.response.data.message));
  };

  const postImage = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      alert("Please select Image");
      setLoading(false);
      return;
    }
    // console.log(formstate.pic[0])
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
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
          // console.log(dat.url.toString())
          setUserInfo({
            ...userInfo,
            pic: dat.url.toString(),
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      alert("Please select Image");
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  // console.log(userInfo);
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
                  onChange={(e) => postImage(e.target.files[0])}
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
              onClick={() => handleEdit(userInfo._id)}
              isLoading={loading}
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
