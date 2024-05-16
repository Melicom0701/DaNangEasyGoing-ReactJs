import {
  Text,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
  Tooltip,
  Tag,
  TagLabel,
  Link,
  TagCloseButton,
  InputRightAddon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

const dataFilter = (data) => {
  const _price = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const categories = data.Categories_Items.map(
    (category) => category.Category.name
  );
  return {
    name: data.name,
    image: data.image,
    price: _price,
    destinationId: data.destinationId,
    categories: categories,
    shopName: data.Destination.name,
    location: data.Destination.location,
  };
};

const dataFilterC = (data) => {
  const _price = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const categories = data.Categories_Items.map((category) => category.name);
  return {
    name: data.name,
    image: data.image,
    price: _price,
    destinationId: data.destinationId,
    categories: categories,
    shopName: data.Destination.name,
    location: data.Destination.location,
  };
};

const getSearchResult = async (searchText) => {
  if (!searchText) searchText = "";
  const API =
    process.env.REACT_APP_ENDPOINT + "search/searchByName?q=" + searchText;
  const res = await fetch(API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
  console.log(res);
  return res;
};

const getSearchResultByCategory = async (categories) => {
  if (categories.length === 0) return [];
  categories = categories.join(",");
  const API =
    process.env.REACT_APP_ENDPOINT + "search/searchByCategory?q=" + categories;
  const res = await fetch(API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
  console.log(res);
  return res;
};

// Debounce function to delay search requests
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function Search() {
  const [onsearch, setonsearch] = useState(false);
  const [searchResult, setsearchResult] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (onsearch) {
    }
  }, [onsearch]);

  useEffect(() => {
    if (searchResult.length >= 9) {
      setsearchResult(searchResult.slice(0, 7));
    }
  }, [searchResult]);

  const FinishSearchHandle = () => {
    setonsearch(false);
    console.log("SearchHandle");
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      getSearchResult(text).then((data) => {
        //clear data 
        setsearchResult([]);
        setsearchResult(data.map(dataFilter));
      });
      if (categories.length > 0) {
        getSearchResultByCategory(categories).then((data) => {
          setsearchResult(data.map(dataFilterC));
        });
      }
    }, 500), 
    [categories]
  );

  const handleTextChange = (e) => {
    setonsearch(true);
    setsearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleAddCategory = (e) => {
    if (e.key === "Enter" && searchText) {
      setCategories([searchText, ...categories]);
      if (categories.length >= 5) {
        setCategories(categories.slice(0, 5));
      }
      setsearchText("");
      e.preventDefault(); // Prevent form submit
    }
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const TruncatedText = (text, maxLength) => {
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    return <div className="truncated-text">{truncatedText}</div>;
  };

  return (
    <div>
      <Flex direction="column" onBlur={FinishSearchHandle}>
        <InputGroup>
          <InputLeftAddon>
            <FaSearch />
          </InputLeftAddon>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleTextChange}
            onKeyDown={handleAddCategory}
          />
          {categories.length > 0 && (
            <InputRightAddon>
              <Flex wrap="wrap" mt={2}>
                {categories.map((category, index) => (
                  <Tag size="lg" key={index} borderRadius="full" m={1}>
                    <TagLabel>{category}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveCategory(index)} />
                  </Tag>
                ))}
              </Flex>
            </InputRightAddon>
          )}
        </InputGroup>
        {onsearch && (
          <Box bg="white" boxShadow="xl" p="5px" borderRadius="lg">
            {searchResult.map((item) => {
              return (
                <Box
                  onMouseDown={() => navigate("/ShopReview/" + item.destinationId)}
                >
                  <Flex justify="space-between">
                    <Flex padding="5px">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width="80px"
                        height="80px"
                        p="0 10px 0 0"
                        borderRadius="5px"
                      />
                      <Flex direction="column">
                        <Tooltip label={item.name}>
                          <Text>{item.name}</Text>
                        </Tooltip>
                        <Tooltip label={item.location}>
                          <Text fontSize="sm" color="gray">
                            {item.location}
                          </Text>
                        </Tooltip>
                        <Flex wrap="wrap">
                          {item.categories.map((category, index) => (
                            <Tag size="lg" key={index} borderRadius="full" m={1}>
                              <TagLabel>{category}</TagLabel>
                            </Tag>
                          ))}
                        </Flex>
                      </Flex>
                    </Flex>
                    <Text color="blue" fontSize="lg" p="40px">
                      {item.price + "đ"}
                    </Text>
                  </Flex>
                </Box>
              );
            })}
          </Box>
        )}
      </Flex>
    </div>
  );
}
