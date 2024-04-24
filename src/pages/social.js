import { useState } from "react";
import { Heading, Container, Box, Flex, Spacer, Stack, HStack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Navbar from  "../components/Navbar";
import _Social from "../components/Social/_Social";

function Social() {
 
  return (
    <>
       
        <_Social />

    </>
  );
}

export default Social;




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
