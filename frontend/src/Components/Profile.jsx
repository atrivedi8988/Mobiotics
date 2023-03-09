import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Stack,
  Divider,
  Image,
  ButtonGroup,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `https://mobiotics.up.railway.app/api/user/delete/${id}`
      );
      alert(res.data.message);
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer null`;
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get("https://mobiotics.up.railway.app/api/user/profile")
      .then((res) => {
        setUserInfo(res.data);
      });
  }, []);
  return (
    <>
      <Card maxW="lg" margin={"auto"}>
        <CardBody>
          <Image
            src={userInfo.pic}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            margin={"auto"}
            height={"400px"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Name : {userInfo.name}</Heading>
            <Text>Email id : {userInfo.email}</Text>
            <Text>Role : {userInfo.role}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="3rem" margin={"auto"}>
            <Button variant="solid" colorScheme="blue">
              <EditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </Button>
            <Button onClick={()=>handleDelete(userInfo._id)} variant="solid" colorScheme="red">
              Delete Account
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}

export default Profile;
