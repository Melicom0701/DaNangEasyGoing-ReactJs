import React from "react";
import {
  Box,
  Flex,
  Text,
  space,
  Divider,
  IconButton,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { FiMenu, FiHome } from "react-icons/fi";
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const navigate = useNavigate();
  const [navSize, setNavSize] = React.useState("large");
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
            title="Review"
            icon={FiHome}
            active={props._active == "Review" ? 1 : 0}
            link="/Review"
          />
          <NavItem
            navSize={navSize}
            title="Easy Going"
            icon={FiHome}
            active={props._active == "EasyGoing" ? 1 : 0}
          />
          <NavItem
            navSize={navSize}
            title="Saved"
            icon={FiHome}
            active={props._active == "YourTrip" ? 1 : 0}
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
    </Flex>
  );
};

export default SideBar;
