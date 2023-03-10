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
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";
import Pagination from "./Pagination";

function UserList() {
  const [searchparam,setSearchparam] = useSearchParams()

  const [totalPages,setTotalPages] = useState(5)
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(5)
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

 
  
  const handleAllUsers = async (page,limit) => {
    
    try {
      let res = await axios.get(
        `https://mobiotics.up.railway.app/api/user/admin/allusers?page=${page}&limit=${limit}`
        );
        if (res.data.success) {
          setUsers(res.data.user);
          // console.log(typeof total, limit)
          setTotalPages(Math.ceil(res.data.totalPage/limit))
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
      handleAllUsers(page,limit);
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
      handleAllUsers(page,limit);
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
    setSearchparam({"page":page,"limit":limit})
    handleAllUsers(page,limit);
  }, [page,limit]);

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
      <Pagination total={totalPages} limit={limit} page={page} setPage={setPage}/>
    </>
  );
}

export default UserList;
