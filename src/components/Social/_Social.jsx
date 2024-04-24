
import { Grid, GridItem, Heading, SimpleGrid, Text, Box, Tabs, TabList, Tab, TabPanel, TabPanels , Divider} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import { Input } from '@chakra-ui/react'
import SideBar from "../SideBar/SideBar";
export default function Social() {

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

        <GridItem colSpan={6}  p='30px' rounded='20px' margin="0 0 0 250px">

            

        </GridItem>
      </Grid>
    </div>
    </>
    
  );
}
