import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function ProfileEditor() {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");
  const toast = useToast();

  const getUserProfile = async () => {
    const API = process.env.REACT_APP_ENDPOINT + 'user/me';
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(API, requestOptions);
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username);
        setName(data.name);
        setPhone(data.phone);
        setImageUrl(data.avatar);
        setEmail(data.email);
        setId(data.id);

      } else {
        toast({
          title: 'Failed to fetch user profile.',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }


  }
  useEffect(() => {
    getUserProfile();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    //        const { name, username, email, phone,password } = req.body;
    const API = process.env.REACT_APP_ENDPOINT + 'user/me';
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        name,
        email,
        phone,
        password,
        avatar: imageUrl,
      }),
    };
    await fetch(API, requestOptions)
    .then ((res) => res.json())
    .then ((data) => {
     
      if (data.message) {
        toast({
          title: 'Profile updated successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      else {
        toast({
          title: "Failed to update profile.",
          description: data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

    })
    .catch((error) => {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    });
    
  };

  const handleImageUpload = async () => {
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

    try {
      const response = await fetch(API, requestOptions);
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Image uploaded successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setImageUrl("http://127.0.0.1:8000/"+data.path);
      } else {
        toast({
          title: "Failed to upload image.",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

//   {
//     "id": "396667ec-7cd4-40e3-b2e8-d0ebb90c573a",
//     "name": "Linh Nguyen",
//     "username": "melicom",
//     "email": "melicom0701@gmail.com",
//     "roleId": 2,
//     "avatar": "http://127.0.0.1:8000/commentor.jpg",
//     "phone": "0777480701"
// }
  return (
    <Container maxW="container.xl" mt={4}>
      <Stack spacing={4}>
        <Heading as="h2" size="lg">
          Edit Profile
        </Heading>
        <Box as="hr" />

        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Box>
            <Box
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              mb={4}
              textAlign="center"
              p={4}
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={imageUrl?imageUrl:"https://via.placeholder.com/150"}
                alt="Profile"
                mb={4}
              />
              <Text fontSize="sm" color="gray.500" mb={4}>
                JPG or PNG no larger than 5 MB
              </Text>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                mb={4}
              />
              <Button colorScheme="blue" onClick={handleImageUpload}>
                Upload new image
              </Button>
            </Box>
          </Box>

          <Box flex={1}>
            <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
              <form onSubmit={handleFormSubmit}>
                <FormControl id="username" mb={3}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    bg="gray.200"
                    value={username}
                    isReadOnly
                  />
                </FormControl>
                <Stack direction={{ base: "column", md: "row" }} spacing={3}>
                  <FormControl id="firstName" mb={3}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <FormControl id="email" mb={3}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="phone" mb={3}>
                  <FormLabel>Phone number</FormLabel>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" mb={3}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <Button type="submit" colorScheme="blue">
                  Save changes
                </Button>
              </form>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}