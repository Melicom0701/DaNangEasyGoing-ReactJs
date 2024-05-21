import { useState } from "react";
import { Heading, Container, Box, Flex, Spacer, Stack, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MainLayout from "./components/Travel/Travel";
import Maps from "./components/Maps/Maps";


function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  const boxStyle = {
    p : "10px",
    bg : "tomato",
    color : "white",
    fontWeight : "bold",
    borderRadius : "5px",
    boxShadow : "md",
    _hover : {
      bg : "green"
    }

  };

  return (
    <>
      {/* <MainLayout /> */}
      <div style={{border: '2px solid red',display:"flex",flexDirection:"row",width:"100vw",height:"100vh"}}>
        <div style={{border: '2px solid red',width:"50vw"}}>
          <Maps selectPosition={selectPosition}/>
        </div>
        <div style={{border: '2px solid red',width:"50vw"}}>
        </div>
      </div>

    </>
  );
}

export default App;


/*
  <Navbar />

      <Container maxWidth="8xl" >
        <Heading >
          Welcomeeeeeeeeeeeeeeeeeeeeee
        </Heading>
        <Box>
          <Flex>
            <Box sx={boxStyle} >
              <Heading>
                Left
              </Heading>
            </Box>
            <Spacer />
            <Box>
              <Heading>
                Right
              </Heading>
            </Box>
          </Flex>
        </Box>


      <ProductContainer/>

      </Container>

      <Outlet/>*/