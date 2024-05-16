import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  space,
  Divider,
  IconButton,
  Spacer,
  Image,
  Button,
} from "@chakra-ui/react";
import { FiMenu, FiHome } from "react-icons/fi";
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";

const SideBar =  (props) => {
  const navigate = useNavigate();
  const [navSize, setNavSize] = React.useState("large");
  const token = localStorage.getItem("token");
  const [user, setUser] = React.useState(null);
  useEffect(() => {
  if (token) {
    const API = process.env.REACT_APP_ENDPOINT + "user/me";
    const requestOption = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(API, requestOption)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }} , [token]);

  return (
    <Flex
      direction="column"
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rbga(0,0,0,0.05)"
      borderRadius={navSize == "small" ? "10px" : "20px"}
      w={navSize == "small" ? "72px" : "250px"}
      flexDir="column"
      justifyContent="space.between"
    >
      <div>LOGO</div>

      <Flex p="5%" flexdir="column" alignItem="flex-start" as="nav">
        <Flex
          mt={5}
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
        >
          <div>
            <IconButton
              background="none"
              mt={5}
              _hover={{ background: "none" }}
              icon={<FiMenu />}
              p={3}
              onClick={() => {
                if (navSize == "small") {
                  setNavSize("large");
                } else {
                  setNavSize("small");
                }
              }}
            ></IconButton>
          </div>

          {/* assign active to  */}

          <NavItem
            navSize={navSize}
            title="Travel"
            icon={FiHome}
            active={props._active == "Travel" ? 1 : 0}
            link="/"
          />
          <NavItem
            navSize={navSize}
            title="Quick Review"
            icon={FiHome}
            active={props._active == "Review" ? 1 : 0}
            // link="/Review"
          />
          <NavItem
            navSize={navSize}
            title="Easy Going"
            icon={FiHome}
            active={props._active == "easygoing" ? 1 : 0}
            link="/EasyGoing"
          />
          <NavItem
            navSize={navSize}
            title="Saved"
            icon={FiHome}
            active={props._active == "saved" ? 1 : 0}
            link ="/Saved"
          />
       
        </Flex>
      

      </Flex>
      <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={4}>
     
        <Divider display={navSize == "small" ? "none" : "flex"} />
        
        <Flex
          mt={4}
          align="center"
          display={navSize == "small" ? "none" : "flex"}
          justifyContent={"center"}

        >
        <Button p="20px" onClick={()=>{
            navigate("/NewDestination");

        }}>
            Địa Điểm Mới
        </Button>



        </Flex>
      </Flex>
      <Flex direction="column">
        <Divider />
        {user && (
          <>
          <Flex alignItems="center" p="5px 5px 0 20px" >
            <Image src={user.avatar} h="60px" w="60px" borderRadius="100%" alt="user" m="0 20px 0 0" />
            <Text color="blue" fontSize="15px" >{user.name}</Text>
          </Flex>
          <Button m="20px 0 20px 20px"
          onClick={()=>{
            localStorage.removeItem("token");
            window.location.reload();
          }}
          > Đăng Xuất </Button>
          </>
        )}
        {user == null && (
          <Button m="20px 0 20px 20px" onClick={()=>{
            navigate("/login");
          }}> Đăng Nhập </Button>
        
        )}
        <Text fontSize="xs" color="gray.400" p="20px">
          © 2021 Travel
        </Text>
      </Flex>
    </Flex>
  );
};

export default SideBar;
