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
  HStack,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
  Checkbox,
  VStack,
  IconButton,
  Link,
  TagCloseButton,
  InputRightAddon,
} from "@chakra-ui/react";
import { FaSearch, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Rate } from "antd";

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
const dataFilterA = (data) => {
  const _price = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return {
    name: data.name,
    image: data.image,
    price: _price,
    destinationId: data.destinationId,
    categories: [],
    shopName: "Một quán nào đó",
    location: "Đà Nẵng",
  };

}

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

const advancedSearch = async (searchText) => {
  if (!searchText) searchText = "";
  const API = process.env.REACT_APP_ENDPOINT + "search/advancedSearch?q=" + searchText;
  console.log(API)
  const res = await fetch(API)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return [];
      return data;
    })
    .catch((err) => {
      console.log(err)
      return [];

    });
  return res;
}



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

export default function Search({changeFoodItems}) {
  const [onsearch, setonsearch] = useState(false);
  const [searchResult, setsearchResult] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [isadvancedSearchOn, setIsAdvancedSearchOn] = useState(false);
  const [priceRange, setPriceRange] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const districts = [
    "Quận Thanh Khê",
    "Quận Liên Chiểu",
    "Quận Ngũ Hành Sơn",
    "Quận Hải Châu",
    "Quận Sơn Trà",
    "Quận Cẩm Lệ",
    "Hòa Vang",
    "Hoàng Sa",
  ];
  const handleDistrictChange = (district) => {
    setSelectedDistricts((prev) =>
      prev.includes(district)
        ? prev.filter((d) => d !== district)
        : [...prev, district]
    );
  };

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

    }, 500),
    [categories]
  );

  const handleTextChange = (e) => {


    setsearchText(e.target.value);

    if (!isadvancedSearchOn)
      {
    setonsearch(true);
    if (!isFilterVisible)
    debouncedSearch(e.target.value);
      }
  };

  const handleClear = () => {
    setSelectedDistricts([]);
    setCategories([]);
    setPriceRange([0, 100]);
    setRating(0);
    setsearchText("");
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
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
    //localhost:8000/search/filterSearch?
    //e = localtion
        //p = price 
        //s = star
    let e,p,s,t;
    if (selectedDistricts.length > 0) 
    e = selectedDistricts.join(",");
    else e = "";
    if (priceRange!=0)
    p = parseFloat(priceRange*1000);
    else p = 1000000;
    s = parseFloat(rating);

    t = searchText;
    if (!t) t = "";

    const API = process.env.REACT_APP_ENDPOINT+'search/filterSearch?e='+e+'&p='+p+'&s='+s + '&t='+t;
    // const API = "";
    await fetch(API)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      resData = data.map((item) => destructuredItem(item));
      return resData;
    }
    )
    .catch(err => console.log(err));

    return resData;
  }
  const handleSearch = async () => {
    //get data
    if (isadvancedSearchOn)
    {
      setonsearch(true);
      advancedSearch(searchText).then((data) => {
        console.log("abc");
        console.log(data);
        setsearchResult([]);
        setsearchResult(data.map(dataFilterA));
      })
    }
    else 
    getFoodItems().then((data) => {
      changeFoodItems(data);
    })

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
                    <TagCloseButton
                      onClick={() => handleRemoveCategory(index)}
                    />
                  </Tag>
                ))}
              </Flex>
            </InputRightAddon>
          )}
        </InputGroup>
        <Checkbox
          m = "10px"
          isChecked={isadvancedSearchOn}
          onChange={() => setIsAdvancedSearchOn(!isadvancedSearchOn)}
          
            colorScheme="blue"
          >
            Tìm kiếm nâng cao
          </Checkbox>
        {isFilterVisible && (
          <div>
            <Box mt={4}>
              <VStack align="start">
                <Heading size="sm">Khu vực</Heading>
                {districts.map((district) => (
                  <Checkbox
                    key={district}
                    isChecked={selectedDistricts.includes(district)}
                    onChange={() => handleDistrictChange(district)}
                  >
                    {district}
                  </Checkbox>
                ))}
              </VStack>
            </Box>
            <Box mt={4}>
              <VStack align="start">
                <Heading size="sm">Giá tiền (VNĐ)</Heading>
                <Slider
                  aria-label="price-range-slider"
                  defaultValue={[0, 100]}
                  min={0}
                  max={1000}
                  step={1}
                  onChangeEnd={(val) => setPriceRange(val)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6} index={0} />
                  <SliderThumb boxSize={6} index={1} />
                </Slider>
                <Text>{`Từ 0k đến ${priceRange}k`}</Text>
              </VStack>
            </Box>

            <Box mt={4}>
              <VStack align="start">
                <Heading size="sm">Xếp loại (số sao)</Heading>

                <Rate value={rating} onChange={setRating} allowHalf></Rate>
              </VStack>
            </Box>
          </div>
        )}
        <HStack mt={4}>

          <Button onClick={handleClear}>Xóa bộ lọc</Button>
          <Button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            variant="outline"
          >
            {isFilterVisible ? "Tắt bộ lọc" : "Hiển thị bộ lọc"}
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
         
          
        </HStack>

        {onsearch && (
          <Box bg="white" boxShadow="xl" p="5px" borderRadius="lg">
            {searchResult.map((item) => {
              return (
                <Box
                  onMouseDown={() =>
                    navigate("/ShopReview/" + item.destinationId)
                  }
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
                            <Tag
                              size="lg"
                              key={index}
                              borderRadius="full"
                              m={1}
                            >
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
