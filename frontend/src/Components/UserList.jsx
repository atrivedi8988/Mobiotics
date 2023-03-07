import { Image, Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  const handleAllUsers = () => {
    axios
      .get("http://localhost:8080/api/user/allusers")
      .then((res) => {
        // console.log(res)
        setUsers(res.data.user);
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleRole = (id,role) => {
    const value = prompt
    axios
      .patch(`http://localhost:8080/api/user/assignadmin/${id}`, {
        role: value("Edit Your Role user to admin and admin to user")||role
      })
      .then((res) => {
        handleAllUsers();
        alert("Role changed successfully")
      }).catch(err=>console.log(err))
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
          </Tr>
        </Thead>
        <Tbody>
          {users.map((el,i) => {
            return (
              <Tr key={i}>
                <Td>{i+1}</Td>
                <Td><Image src={el.pic} width={"50px"}/></Td>
                <Td>{el.name}</Td>
                <Td>{el.email}</Td>
                <Td
                  _hover={{ cursor: "pointer" }}
                  onClick={() => handleRole(el._id,el.role)}
                >
                    {el.role}
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
