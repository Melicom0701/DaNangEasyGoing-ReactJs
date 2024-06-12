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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { delay } from "framer-motion";

const NewDestination = () => {
  const checkInput = () => {
    if (!name) {
      toast.error("Vui lòng nhập tên địa điểm");
      return false;
    }
    if (!description) {
      toast.error("Vui lòng nhập mô tả");
      return false;
    }
    if (!location) {
      toast.error("Vui lòng nhập địa chỉ");
      return false;
    }
    if (!image) {
      toast.error("Vui lòng chọn hình ảnh");
      return false;
    }
    if (!startTime) {
      toast.error("Vui lòng chọn thời gian bắt đầu");
      return false;
    }
    if (!endTime) {
      toast.error("Vui lòng chọn thời gian kết thúc");
      return false;
    }
    if (!averageRating) {
      toast.error("Vui lòng nhập đánh giá");
      return false;
    }
    if (!averagePrice) {
      toast.error("Vui lòng nhập giá trung bình");
      return false;
    }
    if (!x || !y) {
      toast.error("Vui lòng chọn tọa độ");
      return false;
    }
    if (!category) {
      toast.error("Vui lòng chọn loại hình sản phẩm");
      return false;
    }
    return true;
  };
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
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
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
  const uploadImage = async () => {
    const API = process.env.REACT_APP_ENDPOINT + "blob/image";
    const formData = new FormData();
    formData.append("image", image);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    };
    fetch(API, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setImagePreview(data.url);
      })
      .catch((error) => console.log("error", error));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInput()) return;
    const API = process.env.REACT_APP_ENDPOINT + "blob/image";
    const formData = new FormData();
    formData.append("image", image);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    };
    await fetch(API, requestOptions)
      .then((response) => response.json())
      .then(async (data) => {
        let imageUrl = process.env.REACT_APP_ENDPOINT + data.path
        setImagePreview(imageUrl);
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
                image : imageUrl?imagePreview:"",
                endTime: endTime,
                averageRating: averageRating,
                averagePrice: averagePrice,
                x: x,
                y: y,
                category: category,
            }),
        };
        await fetch(API, requestOptions)
            .then((response) => response)
            .then((data) => {
                console.log("abc" + data);
                if (data.ok) {
                    //toast delay 2s
                    toast.success("Thêm địa điểm thành công");
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                    } else {
                    toast.error("Thêm địa điểm thất bại");
                }

            })
            .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box p={5}>
      <ToastContainer />
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
