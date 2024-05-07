import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Stack } from "@chakra-ui/layout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Spacer,
  Flex,
} from "@chakra-ui/react";

import { Rate } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTag,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { ChatIcon } from "@chakra-ui/icons";
export default function DesCard({ item }) {
  // const _item = {
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
  const _item = item;

  function isActive() {
    var d = new Date();
    var n = parseInt(d.getHours());
    if (n >= parseInt(_item.TimeStart) && n <= parseInt(_item.TimeEnd)) {
      return true;
    }

    return false;
  }

  const TruncatedText = (text, maxLength) => {
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    return <div className="truncated-text">{truncatedText}</div>;
  };
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        borderWidth="1px"
        borderRadius="lg"
        _hover={{ boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)" }}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "400px" }}
          src={_item.image}
          alt={_item.name}
        />

        <Stack spacing="7">
          <CardBody p="30px 40px">
              <Heading size="lg">{_item.name}</Heading>
              <Text p ="0 0 0 0">
                <i>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {" " + _item.location}
                </i>
              </Text >

             
              
            {/* bigger size of Rate tag (antd) */}
            <Rate allowHalf value={_item.rate}/>
              <Text>
                <FontAwesomeIcon icon={faClock} />
                <b>
                  {" "}
                  {isActive() ? (
                    <b style={{ color: "green" }}>Đang mở</b>
                  ) : (
                    "Đóng cửa"
                  )}
                </b>
                {" " + _item.TimeStart} - {_item.TimeEnd}
              </Text>
              <Text>
                <FontAwesomeIcon icon={faTag} />
                {" " + _item.priceStart} - {_item.priceMax}
              </Text>
              <Text fontSize='lg' as="i"  >
                <ChatIcon/>   
                {" "+_item.description}</Text>            
              <br />
            
             
          </CardBody>

        </Stack>
      </Card>
    </>
  );
}
