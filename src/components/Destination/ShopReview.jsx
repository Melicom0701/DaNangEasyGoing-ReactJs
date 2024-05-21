import DesCard from "./DesCard";
import React from "react";
import { Grid, GridItem, Spacer } from "@chakra-ui/react";
import Review from "./Review";
import SideBar from "../SideBar/SideBar";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import WriteReview from "./WriteReview";
import AddMenu from "./AddMenu";
import axios from "axios";
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
import Search from "./Search";
import Menu from "./Menu";
import Maps from "../Maps/Maps";
import { jwtDecode } from "jwt-decode";

// {
//   name: "Sun World Ba Na Hills tại Đà Nẵng",
//   location: "Hòa Phú, Hòa Vang, Đà Nẵng",
//   TimeStart: "8:00",
//   TimeEnd: "24:00",
//   image:
//     "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000908871772/Sun-World-Ba-Na-Hills-in-Da-Nang--ce8d864c-da07-4dc0-91db-f320fa9fbbeb.jpeg?_src=imagekit&tr=c-at_max,h-750,q-100,w-1000",
//   rate: 4.5,
//   priceStart: "500.000",
//   priceMax: "1.000.000",
//   x: 16.047079,
//   y: 108.20623,
// };
// const item = {
//   "id": "1",
//   "title": "json-server",
//   "location": "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",
//   "author": "Linh Nguyen",
//   "author_avatar": "https://i.pinimg.com/280x280_RS/2f/74/37/2f74373760dd9a657517b19e635318d5.jpg",
//   "context": "Món ăn ở đây cực kì độc đáo",
//   "image": "https://images.foody.vn/res/g100001/1000000322/prof/s576x330/beauty-upload-api-file_8d66bc45-86f2-4dc0-9ce7-c94bac4f6e3b-200521104545.jpeg"
// }

const destructuredReview = (item) => {
  const res = {
    id: item.id,
    author: item.User.name,
    destinationId: item.destinationId,
    author_avatar: item.User.avatar,
    context: item.review,
    image: item.image,
    rate: item.rating,
    location: item.Destination.location,
    shopName : item.Destination.name,
  };
  return res;
};
const getShopItems = async (id) => {
  let resData = {};
  //fetch
  await fetch(process.env.REACT_APP_ENDPOINT + "destination/" + id)
    .then((res) => res.json())
    .then((data) => {
      resData = destructuredItem(data);
    })
    .catch((err) => console.log(err));
  return resData;
};
const checkAPI = async (id) => {
  //check is shop exists if not return 404
  let resData = {};
  await fetch(process.env.REACT_APP_ENDPOINT + "destination/" + id)
    .then((res) => res.json())
    .then((data) => {
      resData = data;
    })
    .catch((err) => console.log(err));
  if (resData.id === undefined) {
    return false;
  }
  return true;
};
const destructuredItem = (item) => {
  const res = {
    id: item.id,
    description: item.description,
    ownner: item.userId,
    name: item.name,
    location: item.location,
    TimeStart: item.startTime,
    TimeEnd: item.endTime,
    image: item.image,
    rate: parseFloat(item.averageRating),
    priceStart: item.averagePrice,
    priceMax: item.averagePrice,
    x: item.x,
    y: item.y,

  };
  return res;
};

const TruncatedText = (text, maxLength) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <div className="truncated-text">{truncatedText}</div>;
};

const getReviews = async (id) => {
  let resData = [];
  //fetch

  await fetch(process.env.REACT_APP_ENDPOINT + "destination/" + id + "/review")
    .then((res) => res.json())
    .then((data) => {
      resData = data.map((item) => destructuredReview(item));
    })
    .catch((err) => console.log(err));
  return resData;
};
let cnt = 0;

export default function ShopReview() {
  //get route params

  const { DestinationId } = useParams();
  const [Reviews, setReviews] = useState([{}]);
  const [Destination, setDestination] = useState({});
  const [isExist, setExist] = useState(true);
  const [onPost, setonPost] = useState(false);
  const [isOwner, setOwner] = useState(false);
  const [onMenu, setOnMenu] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let userId;
  if (token)
  userId = jwtDecode(token).id;

  const openMenu = () => {
    setOnMenu(true);
  }
  const closeMenu = () => {
    setOnMenu(false);
  }



  const openPost = () => {
    setonPost(true);
  };
  const closePost = () => {
    setonPost(false);
  };
  useEffect(() => {
    if (!userId) {
      navigate("/login")
    }
  });

  useEffect(() => 
    {
      const fetchData = async () => {
        
        const _destination = await getShopItems(DestinationId);
        const _reviews = await getReviews(DestinationId);
        const _isExist = await checkAPI(DestinationId);
        setReviews(_reviews);
        setDestination(_destination);
        
        setExist(_isExist);
        if (_destination.ownner === userId) {
          setOwner(true);
        }
      }

      fetchData();

    },[onPost])


  
    


  const [onMaps, setonMaps] = useState(false);
  const openMaps = () => {
    setonMaps(true);
  };

  const closeMaps = () => {
    setonMaps(false);
  };
  const x = Destination.x;
  const y = Destination.y;
  if (!isExist) {
    return <NotFound />;
  }

  return (
    <div
    style={{
      backgroundColor: "rgb(240,242,245)",
      minHeight: "100vh",
      padding:"16px",
    }}
    >
      <Grid templateColumns="repeat(8, 1fr)" gap={2}>
        <div
          style={{
            backgroundColor: "rgb(240,242,245)",
            position: "sticky",
            top: "0",
            zIndex: "1",
            height: "50px",
            width: "100%",
          }}
        >
          <GridItem h="10">
            <SideBar _active="Review"/>
          </GridItem>
        </div>

        <GridItem colSpan={7} >
          <DesCard item={Destination} />

          <Grid templateColumns="repeat(8,1fr)" gap={2}
            minHeight="100vh"
            backgroundColor= "white"
            m="10px 0 0 0 "
            borderRadius="30px"
            p="30px"
            >
            <GridItem colSpan={1} p=" 0 16px 0 0 ">
              <div
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "1",
                  height: "50px",
                }}
              >
               
                
               <Box height="80px"></Box>
                <Button
                  colorScheme="blue"
                  width="200px"
                  m="0 0 30px 0"
                  onClick={openPost}
                            >
                  Viết Đánh Giá
                </Button>
                <Button
                  colorScheme="blue"
                  width="200px"
                  m="0 0 30px 0"
                  onClick={openMaps}
                >
                  Định Vị
                </Button>

               
                {
                  isOwner && (
                    <>
                    <Button colorScheme="red" m="10px" w="50px">
                      Xóa
                    </Button>
                    <Button colorScheme="green" onClick={openMenu}  >
                    Thêm Menu 
                    </Button>

                    </>
                     
                    
                  )

                }
              </div>
            </GridItem>
            <GridItem colSpan={6}>
              <Tabs>
                <div
                  style={{
                   
                   
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
                    {Reviews.map((item) => {
                      return <Review item={item} />;
                    })}
                  </TabPanel>
                  <TabPanel padding="30px 0 0 0">
                    {/* <Review /> */}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>

            <GridItem colSpan={1} p="0 0 0 5px">
              <div
                style={{
                  
                  position: "sticky",
                  top: "0",
                  zIndex: "1",
                  height: "50px",
                  width: "360px",
                }}
              >
                <Flex h="58px" align="center" justify="center">
                  <Text color="red" as="b">
                    {" "}
                    Menu{" "}
                  </Text>
                </Flex>
                <br />
                <Menu  Id ={DestinationId} onMenu />
               
              </div>
            </GridItem>
          </Grid>
        </GridItem>
        <div
          style={{
            backgroundColor: "rgb(240,242,245)",
            position: "sticky",
            top: "0",
            zIndex: "1",
            height: "50px",
            width: "100%",
          }}
        >
          <GridItem w="100%" >
            
          
          </GridItem>
        </div>
      </Grid>
      

      {onMaps && (
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
            }}
            onClick={closeMaps}
          >
            <Box
              w="660px"
              h="600px"
              rounded="lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Maps selectPosition={{ lat: x, lon: y }} />
            </Box>
          </div>
        </div>
      )}

     {onPost && (
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
            }}
            onClick={closePost}
          >
            <Box
              w="660px"
              h="600px"
              rounded="lg"
              onClick={(e) => e.stopPropagation()}
            >
              <WriteReview Id={DestinationId} closePost={closePost} />
            </Box>
          </div>
        </div>
     )} 

     {onMenu && (
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
            }}
            onClick={closeMenu}
          >
            <Box
              w="660px"
              h="600px"
              rounded="lg"
              onClick={(e) => e.stopPropagation()}
            >
              <AddMenu Id={DestinationId} closeMenu={closeMenu} userId={userId} />
            </Box>
          </div>
        </div>
     )

     }

    </div>
    
  );
}
