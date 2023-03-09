import {
  Button,
  Image,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";

function UserList() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleAllUsers = async () => {
    try {
      let res = await axios.get(
        "https://mobiotics.up.railway.app/api/user/admin/allusers"
      );
      if (res.data.success) {
        setUsers(res.data.user);
      }
    } catch (error) {
      // alert(`${error.response.data.message}`);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      navigate("/profile");
    }
  };

  const handleRole = async (id, role) => {
    const value = role === "admin" ? "user" : "admin";
    try {
      let res = await axios.patch(
        `https://mobiotics.up.railway.app/api/user/admin/assignadmin/${id}`,
        {
          role: value,
        }
      );
      // alert(res.data.message);
      toast({
        title: res.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleAllUsers();
    } catch (error) {
      // alert(error.response.data.message);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `https://mobiotics.up.railway.app/api/user/admin/delete/${id}`
      );
      // alert(res.data.message);
      toast({
        title: res.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleAllUsers();
    } catch (error) {
      // alert(error.response.data.message);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleAllUsers();
  }, []);

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            {/* <Th>ID</Th> */}
            <Th>Serial No.</Th>
            <Th>Profile</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            {/* <Th>Edit</Th> */}
            <Th>Update role</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((el, i) => {
            return (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>
                  <Image src={el.pic} width={"50px"} />
                </Td>
                <Td>{el.name}</Td>
                <Td>{el.email}</Td>
                <Td>{el.role}</Td>
                <Td _hover={{ cursor: "pointer" }}>
                  <Button
                    width={"80px"}
                    bgColor={"teal.100"}
                    onClick={() => handleRole(el._id, el.role)}
                  >
                    {el.role === "admin" ? "User" : "Admin"}
                  </Button>
                </Td>
                <Td
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleDelete(el._id)}
                >
                  <DeleteIcon />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default UserList;
