import DesCard from "./DesCard";
import React from "react";
import { Grid, GridItem, Spacer } from "@chakra-ui/react";
import Review from "./Review";
import { useState } from "react";
import {
  Text,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import Search from "../Destination/Search";
import Menu from "./Menu";
import Maps from "../Maps";
export default function Destination_Detail() {
  const TruncatedText = (text, maxLength) => {
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return <div className="truncated-text">{truncatedText}</div>;
  };
  const [onMaps, setonMaps] = useState(false);
  const openMaps = () => {
    setonMaps(true);
  };

  const closeMaps = () => {
    setonMaps(false);
  };
  const x = 10.762622;
  const y = 10.660172;
  return (
    <div
      style={{
        backgroundColor: "rgb(240,242,245)",
      }}
    >
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem w="100%" h="10" />
        <GridItem colSpan={4}>
          <DesCard />

          <Grid templateColumns="repeat(6,1fr)" gap={6}>
            <GridItem colSpan={1}>
              <div
                style={{
                  backgroundColor: "rgb(240,242,245)",
                  position: "sticky",
                  top: "0",
                  zIndex: "1",
                  height: "50px",
                }}
              >
                <Flex h="50px" align="center" justify="center">
                  <Text color="red" as="b">
                    {" "}
                    Menu{" "}
                  </Text>
                </Flex>
                <Menu />
              </div>
            </GridItem>
            <GridItem colSpan={4}>
              <Tabs>
                <div
                  style={{
                    backgroundColor: "rgb(240,242,245)",
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    height: "50px",
                    width: "660px",
                  }}
                >
                  <TabList maxW="660px">
                    <Tab>Review</Tab>
                    <Tab>Của tôi</Tab>
                  </TabList>
                </div>
                <TabPanels>
                  <TabPanel padding="30px 0 0 0">
                    <Review />
                    <Review />
                    <Review />
                  </TabPanel>
                  <TabPanel padding="30px 0 0 0">
                    <Review />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>

            <GridItem colSpan={1}>
              <div
                style={{
                  backgroundColor: "rgb(240,242,245)",
                  position: "sticky",
                  top: "0",
                  zIndex: "1",
                  height: "50px",
                  width: "300px",
                }}
              >
                <Box height="80px"></Box>
                <Button colorScheme="blue" width="300px" m="0 0 30px 0"  onClick={openMaps}  >
                  Định Vị
                </Button>

                <Search />
              </div>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem w="100%" h="10" />
      </Grid>

      {onMaps&&(
      <div>
      <div
        style={{
          backgroundColor: "rgb(0, 0, 0, 0.5)",
          position: "fixed",
          top: "0",
          zIndex: "10",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }
      }
      onClick={closeMaps}
     
      >
     
        <Box w="660px" h="600px" rounded="lg" onClick={(e) => e.stopPropagation()} >
          <Maps selectPosition={{ lat: x, lon: y }} />
        </Box>
      
      </div>


      </div>
      )}
    </div>
  );
}
