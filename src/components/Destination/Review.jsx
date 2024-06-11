import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import {
  BiChat,
  BiLike,
  BiEdit,
  BiTrash,
  BiHeart,
  BiShare,
} from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";
/*
{
    "id": "1",
    "title": "json-server",
    "location" : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",
    "author": "Linh Nguyen",
    "author_avatar": "https://i.pinimg.com/280x280_RS/2f/74/37/2f74373760dd9a657517b19e635318d5.jpg",
    "context": "Món ăn ở đây cực kì độc đáo",
    "image": "https://images.foody.vn/res/g100001/1000000322/prof/s576x330/beauty-upload-api-file_8d66bc45-86f2-4dc0-9ce7-c94bac4f6e3b-200521104545.jpeg"
  },

*/
const getLikes = async (id) => {
  const API =
    process.env.REACT_APP_ENDPOINT + "destination/Review/" + id + "/like";
  let resData = 0;
  await fetch(API)
    .then((res) => res.json())
    .then((data) => {
      resData = data.count;
    })
    .catch((err) => console.log(err));
  return resData;
};

const getLikeStatus = async (id) => {
  const API =
    process.env.REACT_APP_ENDPOINT + "destination/Review/" + id + "/LikeStatus";
  let resData = false;
  //set token header
  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  await fetch(API, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      resData = data;
    })
    .catch((err) => console.log(err));

  return resData;
};

export default function Review(props) {
  // localhost:8000/user/me

  const getSelf = async () => {
    const API = process.env.REACT_APP_ENDPOINT + "user/me";
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    let resData = {};
    await fetch(API, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        resData = data;
      })
      .catch((err) => console.log(err));
    return resData;
  };
  const self = getSelf();
  const item = props.item;
  console.log(item);

  const [selfId, setSelfId] = useState("");
  const [selfRole, setSelfRole] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const cancelRef = useRef();
  const onEditClose = () => setIsEditOpen(false);
  const onDeleteClose = () => setIsDeleteOpen(false);

  const [likes, setLikes] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    self.then((data) => {
      setSelfId(data.id);
      setSelfRole(data.roleId);
    });
  });

  const Like = async (id) => {
    const API =
      process.env.REACT_APP_ENDPOINT + "destination/Review/" + id + "/Like";
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    await fetch(API, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getLikes(item.id).then((data) => {
      setLikes(data);
    });
    getLikeStatus(item.id).then((data) => {
      setLikeStatus(data);
    });
  }, [item.id]);
  const deleteReview = async (id) => {
    const API = process.env.REACT_APP_ENDPOINT + "destination/Review/" + id;
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    await fetch(API, requestOptions)
      .then((res) => 
        {res.json()
        window.location.reload();
        }
        )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card
        maxW="650px"
        margin="0 0 20px 0"
        backgroundColor="white"
        boxShadow="30px"
      >
        <CardHeader p="20px 20px 0 20px">
          <Flex spacing="4">
            <Flex flex="1" gap="4" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src={item.author_avatar} />

              <Box>
                <Heading size="sm">{item.author}</Heading>
                <Link to={"/ShopReview/" + item.destinationId}>
                  <Tooltip label={item.shopName + " - " + item.location}>
                    <Text>{item.shopName}</Text>
                  </Tooltip>
                </Link>
                <Rate disabled value={item.rate} />
              </Box>
            </Flex>

            {(selfId === item.author_id || selfRole === 2) && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />
                <MenuList>
                  {/* <MenuItem icon={<BiEdit />} onClick={() => setIsEditOpen(true)}>
                                        Edit
                                    </MenuItem> */}
                  <MenuItem
                    icon={<BiTrash />}
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    Xóa
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </CardHeader>

        <CardBody>
          <Text>{item.context}</Text>
        </CardBody>
        <Image objectFit="cover" src={item.image} />

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            leftIcon={
              <BiHeart style={{ fill: likeStatus ? "red" : "black" }} />
            }
            onClick={() => {
              setLikeStatus((prev) => !prev);
              setLikes((pre) => (likeStatus ? pre - 1 : pre + 1));
              Like(item.id);
            }}
          >
            {likes}
          </Button>
          {/* <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                Bình Luận
                </Button> */}
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={isEditOpen}
        leastDestructiveRef={cancelRef}
        onClose={onEditClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Sửa Bình Luận</AlertDialogHeader>
            <AlertDialogBody>Edit content goes here.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onEditClose}>
                Hủy
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onEditClose();
                }}
                ml={3}
              >
                Lưu
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Xóa Bình Luận</AlertDialogHeader>
            <AlertDialogBody>Bạn đồng ý xóa bình luận này chứ?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  //destination/Review/:reviewId
                  deleteReview(item.id);

                  // Handle delete item
                  onDeleteClose();
                }}
                ml={3}
              >
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
