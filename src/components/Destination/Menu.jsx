import {
  Text,
  Tooltip,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
  Spacer,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "@chakra-ui/react";

const resultFilter = (res) => {
  // 3 dot number price
  const _price = res.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const categories = res.Categories_Items.map(
    (category) => category.Category.name
  );
  //cut 3 item
  categories.length = 3;
  console.log(categories);
  const result = {
    name: res.name,
    image: res.image,
    price: _price,
    destinationId: res.destinationId,
    id: res.id,
    shopName: res.Destination.name,
    location: res.Destination.location,
    categories: categories,
  };
  return result;
};

export default function Menu({ Id, onMenu }) {
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    const API = process.env.REACT_APP_ENDPOINT + "destination/" + Id + "/menu";
    console.log(API);
    const fetchData = async () => {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data);

      setMenuList(data.map(resultFilter));
    };
    fetchData();
  }, [onMenu]);

  console.log(menuList);

  const TruncatedText = (text, maxLength) => {
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return <div className="truncated-text">{truncatedText}</div>;
  };
  const UpperCase = (text) => {
    return text.toUpperCase();
  };

  return (
    <>
      <Box
        bg="white"
        boxShadow="xl"
        p="1px"
        borderRadius="lg"
        overflowY="auto"
        maxHeight="400px"
        css={{
          "&::-webkit-scrollbar": {
            width: "0px", // hide scrollbar in Chrome, Safari, and Opera
          },
          scrollbarWidth: "none", // hide scrollbar in Firefox
        }}
      >
        {menuList.map((item, index) => {
          // Adding unique keys to each child
          return (
            <Flex align="center" justify="space-between" p="3px">
              <Flex
                padding="5px"
                key={index}
                align="center"
                justify="space-between"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width="60px"
                  height="60px"
                  p="0 10px 0 0 "
                  borderRadius="5px"
                />
                <Flex align="center" p="3px">
                  <Flex direction="column">
                    <Tooltip label={item.name}>
                      <Text>{TruncatedText(item.name, 36)}</Text>
                    </Tooltip>
                    <Tooltip label={item.shopName + " - " + item.location}>
                      {/* <Text fontSize="sm" color="gray">
                      {TruncatedText(item.shopName + " - " + item.location, 65)}
                    </Text> */}
                      <Flex wrap="wrap" mt={2}>
                        {item.categories.map((category, index) => (
                          <Tag size="lg" key={index} borderRadius="full" m={1}>
                            <TagLabel>{category}</TagLabel>
                          </Tag>
                        ))}
                      </Flex>
                    </Tooltip>
                  </Flex>
                  <Spacer />
                </Flex>
              </Flex>
              <Text color="blue" fontSize="lg">
                {item.price + "đ"}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </>
  );
}
