import React, { useState } from "react";
import {
  Box,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
  VStack,
  Heading,
  Image,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { TimePicker } from "antd";
import { Rate } from "antd";
import Maps from "../Maps/getCoorMaps";
import { FiCamera } from "react-icons/fi";

const NewDestination = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [category, setCategory] = useState("");
  const [onMaps, setOnMaps] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [cate, setCate] = useState("food");

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setImagePreview(imageUrl);
  };
  const closeMaps = () => {
    setOnMaps(false);
  };
  const setCoor = (_x, _y) => {
    setX(_x);
    setY(_y);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const API = process.env.REACT_APP_ENDPOINT + "destination";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            name: name,
            description: description,
            location: location,
            startTime: startTime,
            image : imagePreview?imagePreview:"",
            endTime: endTime,
            averageRating: averageRating,
            averagePrice: averagePrice,
            x: x,
            y: y,
            category: category,
        }),
    };
    fetch(API, requestOptions)
        .then((response) => response)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log("error", error));


    
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Địa Điểm Mới </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel htmlFor="name">Tên : </FormLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Mô tả địa điểm :</FormLabel>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="location">Địa điểm :</FormLabel>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="x">Tọa Độ X : {x}</FormLabel>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="x">Tọa Độ Y : {y}</FormLabel>
          </FormControl>
          <Button onClick={() => setOnMaps(true)}>
            Chọn vị trí trên bản đồ
          </Button>

          <FormControl>
            <FormLabel htmlFor="image">Hình ảnh quảng cáo :</FormLabel>
            {imagePreview && (
              <Image src={imagePreview} alt="Selected Image" mt={4} />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <IconButton
                as="span"
                aria-label="Attach Image"
                icon={<FiCamera />}
                colorScheme="blue"
                variant="outline"
                size="lg"
              />
            </label>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="startTime">Start Time:</FormLabel>
            <Input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              step="1"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="endTime">End Time:</FormLabel>
            <Input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              step="1"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="averageRating">Đánh giá trung bình</FormLabel>
            {/* <NumberInput min={0} max={5} precision={1}>
                            <NumberInputField id="averageRating" value={averageRating} onChange={(e) => setAverageRating(e.target.value)} />
                        </NumberInput> */}
            <Rate value={averageRating} allowHalf onChange={setAverageRating} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="averagePrice">Giá trung bình (vnd) </FormLabel>
            <NumberInput min={0} precision={2}>
              <NumberInputField
                id="averagePrice"
                value={averagePrice}
                onChange={(e) => setAveragePrice(e.target.value)}
              />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="category">Loại hình sản phẩm :</FormLabel>
            <RadioGroup onChange={setCategory} value={category}>
              <Stack direction="row">
                <Radio value="food">Ăn Uống</Radio>
                <Radio value="travel">Du Lịch</Radio>
                <Radio value="booking">Dịch Vụ</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Button colorScheme="blue" type="submit">
            Gửi Yêu Cầu
          </Button>
        </VStack>
      </form>
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
              <Maps onDataChange={setCoor} />
            </Box>
          </div>
        </div>
      )}
    </Box>
  );
};

export default NewDestination;
