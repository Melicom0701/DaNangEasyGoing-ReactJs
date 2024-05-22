import {
    Flex,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
    Text,
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Divider
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { LoadingOutlined } from '@ant-design/icons';
  import CardItem from "./CardItem";
  
  let maxItem = 10;
  
  const destructuredItem = (item) => {
    const _price = item.averagePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return {
      id: item.id,
      title: item.name,
      location: item.location,
      image: item.image,
      price: _price,
      x: item.x,
      y: item.y,
      rating: item.averageRating,
      description: item.description,
    };
  };
  
  const getFoodItems = async (limit = 0) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return [];
    }
  
    let resData = [];
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(process.env.REACT_APP_ENDPOINT + 'destination/saved', requestOptions)
      .then(res => res.json())
      .then(data => {
        resData = data.map((item) => destructuredItem(item.Destination));
        
      })
      .catch(err => console.log(err));
    
  
    return resData;
  };
  
  export default function MainLayout(props) {
    const [FoodItems, setFoodItems] = useState([]);
    const [Page, setPage] = useState(0);
    const [Bgr, setBgr] = useState("white");
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      getFoodItems(Page).then((data) => {
        setFoodItems(data);
      });
  
      const total = (Page + 1) * 10;
      if (total >= maxItem) {
        setHasMore(false);
      }
    }, [Page]);
  
    return (
      <>
        <Box className="wrapper">
          <Box className="bg-outer">
            <Grid
              templateRows='1fr'
              templateColumns='repeat(12, 1fr)'
              gap={4}
              p={20}
              
              className="GridFrame"
            >
              <GridItem colSpan={12} rowSpan={1}>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  className="header"
                >
                 
                </Flex>
              </GridItem>
              <GridItem colSpan={12} rowSpan={1}>
                <Tabs
                  variant="soft-rounded"
                  colorScheme="teal"
                  className="tabs"
                  
                >
                  <TabList>
                    <Tab>Đã Lưu</Tab>
                    {/* <Tab>Drink</Tab> */}
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <SimpleGrid columns={4} spacing={10}>
                        {FoodItems.map((item) => (
                          <CardItem item={item} key={item.id}  />
                        ))}
                      </SimpleGrid>
                     
                    </TabPanel>
                    <TabPanel>
                      <Text>Drink</Text>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </GridItem>
       
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
  