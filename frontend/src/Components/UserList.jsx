import {
  Image,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";

function UserList() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleAllUsers = async () => {
    try {
      let res = await axios.get("https://mobiotics-backend-production.up.railway.app/api/user/allusers");
      if (res.data.success) {
        setUsers(res.data.user);
      }
    } catch (error) {
      alert(`${error.response.data.message}`);
      navigate("/profile");
    }
  };

  const handleRole = async (id, role) => {
    const value = prompt;
    try {
      let res = await axios.patch(
        `https://mobiotics-backend-production.up.railway.app/api/user/assignadmin/${id}`,
        {
          role: value("Edit Your Role user to admin and admin to user") || role,
        }
      );
      alert(res.data.message);
      handleAllUsers();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  
  const handleDelete = ()=>{

  }

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
            <Th>Edit</Th>
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
                <Td
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleRole(el._id, el.role)}
                >
                  {el.role}
                </Td>
                <Td
                  _hover={{ cursor: "pointer" }}
                  
                >
                  <EditModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                </Td>
                <Td
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleDelete(el._id, el.role)}
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
