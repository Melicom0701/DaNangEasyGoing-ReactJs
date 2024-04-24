import { useState } from "react";
import { Heading, Container, Box, Flex, Spacer, Stack, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from  "../components/Navbar";
import MainLayout from "../components/Home/Home";
import ProductContainer from "../components/ProductContainer";
import SearchBox from "../components/SearchBox";
import Maps from "../components/Maps";

function Home() {
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
      <MainLayout />

    


    </>
  );
}

export default Home;




{/* <div style={{border: '2px solid red',display:"flex",flexDirection:"row",width:"100vw",height:"100vh"}}>
        <div style={{border: '2px solid red',width:"50vw"}}>
          <Maps selectPosition={selectPosition}/>
        </div>
        <div style={{border: '2px solid red',width:"50vw"}}>
          <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
        </div>
      </div> */}


    //   <div style={{border: '2px solid red',display:"flex",flexDirection:"row",width:"100vw",height:"100vh"}}>
    //   <div style={{border: '2px solid red',width:"50vw"}}>
    //     <Maps selectPosition={selectPosition}/>
    //   </div>
    //   <div style={{border: '2px solid red',width:"50vw"}}>
    //     <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
    //   </div>
    
    // </div>
