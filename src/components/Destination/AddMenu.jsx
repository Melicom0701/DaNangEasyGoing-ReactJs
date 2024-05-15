import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Textarea,
  Text,
  IconButton,
  Flex,
  Image,
  FormControl,
  NumberInput,
  NumberInputField,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
} from "@chakra-ui/react";
import { Divider, Rate } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FiCamera } from "react-icons/fi";
const AddMenu = ({ Id, closeMenu, userId }) => {
  const [_h, set_h] = useState(100);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setImagePreview(imageUrl);
  };
  const handleAddCategory = (e) => {
    if (e.key === "Enter" && categoryInput) {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
      e.preventDefault(); // Prevent form submit
    }
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };
  const validateInput = () => {
    if (!name || !price || categories.length === 0 || !selectedImage) {
      //notify
      toast.error("Vui lòng điền đủ thông tin");

      return false;
    }
    return true;
  };


  const uploadImage = async () => {
    const API = process.env.REACT_APP_ENDPOINT + "blob/image";
    const formData = new FormData();
    formData.append("image", selectedImage);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    };
  
    try {
      const response = await fetch(API, requestOptions);
      const data = await response.json();
      const imageUrl = process.env.REACT_APP_ENDPOINT + data.path;
      return imageUrl;
    } catch (error) {
      console.log("error", error);
      return null; // or handle error accordingly
    }
  };
  

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    const API = process.env.REACT_APP_ENDPOINT + "blob/image";
    const formData = new FormData();
    formData.append("image", selectedImage);
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
        const imageUrl = process.env.REACT_APP_ENDPOINT + data.path;
        const API =
          process.env.REACT_APP_ENDPOINT + "destination/" + Id + "/menu";
        //json

        const _categories = JSON.stringify(categories);

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: name,
            price: price,
            categories: _categories,
            image: imageUrl ? imageUrl : "",
          }),
        };
        await fetch(API, requestOptions)
          .then((response) => response)
          .then((data) => {
            closeMenu();

            toast.success("Thêm món thành công");
            console.log(data);
          })
          .catch((error) => {
            toast.error("Thêm món thất bại");
            console.log("error", error);
          });

        closeMenu();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div>
      <ToastContainer />
      <Box backgroundColor="white" p="20px" boxShadow="lg" borderRadius="2xl">
        <Text fontSize="lg" fontWeight="bold">
          Thêm Menu
        </Text>
        {/*  */}
        <form>
          <FormControl>
            <Text fontSize="md">Tên Món</Text>
            <Textarea
              placeholder="Nhập tên món"
              value={name}
              onChange={(e) => setName(e.target.value)}
              resize="none"
              h="50px"
            />
          </FormControl>
          <Divider />
          <FormControl>
            <Text fontSize="md">Giá (vnd)</Text>
            <NumberInput min={0} precision={2}>
              <NumberInputField
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </NumberInput>
          </FormControl>
          <FormControl>
            <Text fontSize="md">Thêm Danh Mục</Text>
            <Input
              placeholder="Nhập tên danh mục và nhấn enter"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={handleAddCategory}
            />
            <Flex wrap="wrap" mt={2}>
              {categories.map((category, index) => (
                <Tag size="lg" key={index} borderRadius="full" m={1}>
                  <TagLabel>{category}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveCategory(index)} />
                </Tag>
              ))}
            </Flex>
          </FormControl>

          <Divider />
        </form>

        {imagePreview && (
          <Image src={imagePreview} alt="Selected Image" mt={4} />
        )}
        <Flex align="center" justify="space-between">
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

          <Button colorScheme="blue" onClick={handlePostSubmit}>
            Thêm
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default AddMenu;
