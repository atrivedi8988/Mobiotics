import React from 'react'
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    console.log(axios.defaults.headers.common["Authorization"])
  return (
    <div>
        <Container
        maxW="xl"
      >
        <Box
          bg="white"
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          //   bgColor={"transparent"}
          //   color="white"
        >
          <Tabs variant='enclosed' size={"lg"} isFitted>
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  )
}

export default HomePage