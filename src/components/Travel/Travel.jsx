
import { Grid, GridItem, Heading, SimpleGrid, Text, Box, Tabs, TabList, Tab, TabPanel, TabPanels , Divider} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import { useLoaderData } from "react-router-dom"
import { Input } from '@chakra-ui/react'
import FoodItem from "./FoodItem";
import TravelItem from "./TravelItem";
import Booking from "./Booking";
import SideBar from "../SideBar/SideBar";
import InfiniteScroll from "./InfiniteScroll";
let maxItem = 10;
const destructuredItem =(item) =>
  {
    const res = {
      id:item.id,
      title:item.name,
      location:item.location,
      image:item.image,
      price:item.averagePrice,
      rating:item.rating,
      description : item.description,
      
    }
    return res;

  }

const getFoodItems = async (limit=0) => {
  let resData = [];
  //fetch 
  await fetch(process.env.REACT_APP_ENDPOINT+'destination/food?page=0'+'&limit='+(limit+1)*10)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    maxItem = data.count;
    resData = data.rows.map((item) => destructuredItem(item));
  }
  )
  .catch(err => console.log(err));
  return resData;
}
export default function MainLayout() {
  
  const [FoodItems, setFoodItems] = useState([]);
  const [TravelItems, setTravelItems] = useState([]);
  const [BookingItems, setBookingItems] = useState([]);
  const [Page, setPage] = useState(0);
  const [Bgr, setBgr] = useState("WHITE")
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    console.log("x")
    getFoodItems(Page).then((data) => {
      setFoodItems(data);
    })
    //hasMore  ?
    const total = Page*10;
    if(total > maxItem)
    {
      setHasMore(false);
    }
 



  },[Page]);

  



  return (
    <>
    <div class="wrapper">
    <div class="bg-image">

    </div>
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
          <SideBar _active="Travel" />
        </GridItem> 

       
       
        <GridItem colSpan={6} bg={Bgr} rounded='20px' margin="0 0 0 250px">
        
          <Tabs p="0 30px 0 30px">
          <div style={{ backgroundColor: "white", position: "sticky", top: "0", zIndex: "1", height: "100px", width: "1400px" }}>
        
            <Input placeholder='Hôm nay ăn gì ...' bg='white'  position="sticky" top="20px" zIndex="999" w="1000px" />
            <TabList position="sticky" top="60px" zIndex="999" >
              <Tab onClick={() => setBgr('White')}>Ẩm Thực</Tab>
              <Tab onClick={() => setBgr('White')}>Du Lịch</Tab>
              <Tab onClick={() => setBgr('White')}>Booking</Tab>
            </TabList>
            </div>
            

            <Divider />
            <TabPanels p="">
              <TabPanel>
                <InfiniteScroll
                loader={<p>loading...</p>}
                className="w-[800px] mx-auto my-10"
                fetchMore={() => setPage((prev) => prev + 1)}
                hasMore={hasMore}
                endMessage={<p>Hết Rồi! </p>}>

                
                <SimpleGrid columns={5} spacing={5} minChildWidth='250px'>
                  
                  {FoodItems.map((item) => (
                    <FoodItem key={item.id} item={item} />
                  ))}
                </SimpleGrid>
                </InfiniteScroll>
              </TabPanel>

              <TabPanel>
                <SimpleGrid columns={5} spacing={10} minChildWidth='250px'>
                  {TravelItems.map((item) => (
                    <TravelItem key={item.id} item={item} />
                  ))}
                </SimpleGrid>
              </TabPanel>

              <TabPanel>
                <SimpleGrid columns={5} spacing={10} minChildWidth='250px'>
                  {BookingItems.map((item) => (
                    <Booking key={item.id} item={item} />
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </div>
    </div>
    </>
    
  );
}

