
import {Flex,  Grid, GridItem, Heading, SimpleGrid, Text, Box, Tabs, TabList, Tab, TabPanel, TabPanels , Divider} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import {LoadingOutlined } from '@ant-design/icons';
import { useLoaderData } from "react-router-dom"
import { Input } from '@chakra-ui/react'
import FoodItem from "./FoodItem";
import TravelItem from "./TravelItem";
import Booking from "./Booking";
import SideBar from "../SideBar/SideBar";
import InfiniteScroll from "./InfiniteScroll";
import Search from "./Search";
let maxItem = 10;
const destructuredItem =(item) =>
  {
    const _price = item.averagePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const res = {
      id:item.id,
      title:item.name,
      location:item.location,
      image:item.image,
      price: _price,
      rating:item.averageRating,
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

  const changeFoodItems = async (data) => {
    setHasMore(false);
    setFoodItems(data);

  };


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
    <div >
    <div class="wrapper">
    <div class="bg-image">

    </div>
    <div class="bg-outer">
      <Grid
        templateRows='1fr'
        templateColumns='repeat(6, 1fr)'
        gap={4}
        minHeight="100vh"
        p={4}
        padding='20px'
        class="GridFrame"
        backgroundColor="#e2e8f0"
        
      >
        <GridItem  colSpan={1} rounded='10px' position ="fixed" margin="0 30px 30px 0" >
          <SideBar _active="Travel" />
        </GridItem> 
       
        <GridItem colSpan={6} bg={Bgr} rounded='20px'  margin="0 0 0 280px" p="15px">
        
          <Tabs p="0 30px 0 30px"  >
          {/* <div style={{ position: "fixed", top: "0", zIndex: "1", height: "10px", width: "1500px" }}> 
          </div> 
          <div style={{ position: "fixed", top: "0", zIndex: "1", height: "90px", width: "1500px" }}> 
          </div>  */}
            
            <br />
            {/* <Input placeholder='Hôm nay ăn gì ...' bg='white'  position="sticky" top="20px" zIndex="999" w="1000px" /> */}
            <div style={{  width:"1210px"}} >
            <Search changeFoodItems = {changeFoodItems}  />
            </div>
            <TabList top="60px" >
              <Tab onClick={() => setBgr('White')}>Ẩm Thực</Tab>
              <Tab onClick={() => setBgr('White')}>Du Lịch</Tab>
              <Tab onClick={() => setBgr('White')}>Booking</Tab>
            </TabList>
    
            <br/>
            <br />
            <br />

            <Divider />
            <TabPanels >
              <TabPanel>
                <InfiniteScroll
                loader={<Flex justify="center" alignItems="center"> <LoadingOutlined /></Flex>}
                className="w-[800px] mx-auto my-10"
                fetchMore={() => setPage((prev) => prev + 1)}
                hasMore={hasMore}
                endMessage={<p>
                 
                </p>}>

                
                <SimpleGrid columns={5} spacing={5}  >
                  
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
    </div>
    
  );
}

