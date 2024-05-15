import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Textarea,
  Text,
  IconButton,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Divider, Rate } from "antd";
import { FiCamera } from "react-icons/fi";

const NewPost = ({ Id, closePost }) => {
  const [postText, setPostText] = useState("");
  const [rate, setRate] = useState(0);
  const [_h, set_h] = useState(100);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // when the text box is full of text, increase the height
    if (postText.length > 100) {
      set_h(150);
      if (postText.length > 150) {
        set_h(200);
      }
      if (postText.length > 200) {
        set_h(250);
      }
      if (postText.length > 250) {
        set_h(300);
      }
      if (postText.length > 300) {
        set_h(350);
      }
      if (postText.length > 350) {
        set_h(400);
      }
      if (postText.length > 400) {
        set_h(450);
      }
      if (postText.length > 450) {
        set_h(500);
      }
      if (postText.length > 500) {
        set_h(550);
      }
      if (postText.length > 550) {
        set_h(600);
      }
    }
  }, [postText]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setImagePreview(imageUrl);
  };

  const handlePostChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

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
    if (selectedImage) {
      await fetch(API, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          const imageUrl = process.env.REACT_APP_ENDPOINT + data.path;
          const API = process.env.REACT_APP_ENDPOINT + "destination/" + Id + "/review";
          const token = localStorage.getItem("token");
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              review: postText,
              rating: rate ? rate : 0.5,
              image: imageUrl ? imageUrl : "",
            }),
          };
          await fetch(API, requestOptions)
            .then((res) => res.json())
            .then((data) => console.log("----" + data))
            .catch((err) => console.log(err));
          closePost();
        })
        .catch((error) => console.log("error", error));
    }
    else {
        const API = process.env.REACT_APP_ENDPOINT + "destination/" + Id + "/review";
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
            review: postText,
            rating: rate ? rate : 0.5,
            image: "",
            }),
        };
        await fetch(API, requestOptions)
            .then((res) => res.json())
            .then((data) => console.log("----" + data))
            .catch((err) => console.log(err));
        closePost();

    }
  };
  return (
    <div>
      <Box backgroundColor="white" p="20px" boxShadow="lg" borderRadius="2xl">
        <Text fontSize="lg" fontWeight="bold">
          Viết Đánh Giá
        </Text>
        <Textarea
          value={postText}
          onChange={handlePostChange}
          placeholder="What's on your mind?"
          size="lg"
          fontSize="2xl"
          height={_h}
        />
        <Divider></Divider>
        <Rate allowHalf value={rate} onChange={setRate} />
        <Divider></Divider>
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
            Post
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default NewPost;
