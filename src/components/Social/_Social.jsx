
import { Grid, GridItem, Heading, SimpleGrid, Text, Box, Tabs, TabList, Tab, TabPanel, TabPanels , Divider} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import { Input } from '@chakra-ui/react'
import Post from "./Post";
import SideBar from "../SideBar/SideBar";
import Maps from "../Maps/Maps";

/*
{
    "id": "1",
    "title": "json-server",
    "location" : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",
    "author": "Linh Nguyen",
    "author_avatar": "https://i.pinimg.com/280x280_RS/2f/74/37/2f74373760dd9a657517b19e635318d5.jpg",
    "context": "Món ăn ở đây cực kì độc đáo",
    "image": "https://images.foody.vn/res/g100001/1000000322/prof/s576x330/beauty-upload-api-file_8d66bc45-86f2-4dc0-9ce7-c94bac4f6e3b-200521104545.jpeg"
  },

*/




export default function Social() {
  const [PostItems, setPostItems] = useState([]);
//  const [selectPosition, setSelectPosition] = useState([16.047079,108.206230]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPostItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchItems();
  }, []);


  return (
    <>
    <div class="bg-outer">
      <Grid
        templateRows='1fr'
        templateColumns='repeat(6, 1fr)'
        gap={4}
        p={4}
        padding='20px'
        class="GridFrame"
      >
        <GridItem  colSpan={1} rounded='10px' position ="fixed">
          <SideBar _active='Social'  />
        </GridItem> 
      
        <GridItem colSpan={4}  p='50px 0 100px 170px' rounded='20px'  margin="0 0 0 250px">
          
          <SimpleGrid columns={1} spacing="100px">
            {PostItems.map((item) => (
              <Post key={item.id} item={item} />
            ))}





          </SimpleGrid>
        </GridItem>
        <GridItem colSpan={2} p="30px" rounded='30px' position ="fixed" right="0" w="700px" height="1000px" >
          
          <Maps />
          
        </GridItem>
      </Grid>
    </div>
    </>
    
  );
}

/* <div style={{border: '2px solid red',display:"flex",flexDirection:"row",width:"100vw",height:"100vh"}}>

          <Maps />
      </div>
       
*/