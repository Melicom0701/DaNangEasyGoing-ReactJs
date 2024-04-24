
import { Grid, GridItem, Heading, SimpleGrid, Text, Box, Tabs, TabList, Tab, TabPanel, TabPanels , Divider} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import { Input } from '@chakra-ui/react'
import FoodItem from "../FoodItem";
import TravelItem from "../TravelItem";
import Booking from "../Booking";
import SideBar from "../SideBar/SideBar";
export default function MainLayout() {
  const background = "./DaNanBg.jpg"
  const [FoodItems, setFoodItems] = useState([]);
  const [TravelItems, setTravelItems] = useState([]);
  const [BookingItems, setBookingItems] = useState([]);
  const [Bgr, setBgr] = useState("WHITE")
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/FoodItems');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFoodItems(data);
        //travel
        const response2 = await fetch('http://localhost:3000/TravelItems');
        if (!response2.ok) {
          throw new Error('Failed to fetch data');
        }
        const data2 = await response2.json();
        setTravelItems(data2);
        const response3 = await fetch('http://localhost:3000/BookingItems');
        if (!response3.ok) {
          throw new Error('Failed to fetch data');
        }
        const data3 = await response3.json();
        setBookingItems(data3);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchItems();
  }, []);

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
          <SideBar />
        </GridItem> 

        <GridItem colSpan={6} bg={Bgr} p='30px' rounded='20px' margin="0 0 0 250px">
          <Input placeholder='Hôm nay ăn gì ...' bg='white' />
          <Tabs>
            <TabList>
              <Tab onClick={() => setBgr('White')}>Ẩm Thực</Tab>
              <Tab onClick={() => setBgr('White')}>Du Lịch</Tab>
              <Tab onClick={() => setBgr('White')}>Booking</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={5} spacing={10} minChildWidth='250px'>
                  {FoodItems.map((item) => (
                    <FoodItem key={item.id} item={item} />
                  ))}
                </SimpleGrid>
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

export const tasksLoader = async () => {
  const response = await fetch('http://localhost:3000/items');
  const data = await response.json();
  return data;
}