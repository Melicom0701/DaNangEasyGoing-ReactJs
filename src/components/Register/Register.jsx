import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    birthDate: '',
    avatar: 'http://127.0.0.1:8000/commentor.jpg',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const notifySuccess = (message) => {
    toast({
      title: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/');
  };

  const notifyError = (message) => {
    toast({
      title: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const registerAPI = `${process.env.REACT_APP_ENDPOINT}auth/register`;

    fetch(registerAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) =>{ 
        if (response.status === 201) {
          return {
            ok: 'Đăng Ký Thành Công',
          };
        }
        return response.json()})
      .then((data) => {
        if (data.ok) {
          notifySuccess(data.ok);
          navigate('/login');
        } else
        if (data.message)
          {
            notifyError(data.message);
          }
          else 
        if (data.error) {
          notifyError(data.error);
        } else {
          notifySuccess('Đăng Ký Thành Công');
        }
      })
      .catch((error) => {
        console.log('Error', error);
        notifyError(error.message);
      });
  };

  return (
    <Flex
      className="wrapper signUp"
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.200"
    >
      
      <Box className="form" borderRadius="10px" w={{ base: '90%', md: '40%' }} p={8} bg="white" boxShadow="md">
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          ĐĂNG KÝ
        </Heading>
        <form onSubmit={handleRegister}>
          <VStack spacing={4}>
            <FormControl id="name">
              <FormLabel>Tên</FormLabel>
              <Input type="text" placeholder="Nhập tên của bạn" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl id="username">
              <FormLabel>Tên đăng nhập</FormLabel>
              <Input type="text" placeholder="Nhập tên đăng nhập của bạn" value={formData.username} onChange={handleChange} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Nhập email của bạn" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mật khẩu</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu của bạn"
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Ẩn' : 'Hiện'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Số điện thoại</FormLabel>
              <Input type="tel" placeholder="Nhập số điện thoại của bạn" value={formData.phone} onChange={handleChange} />
            </FormControl>
            <FormControl id="gender">
              <FormLabel>Giới tính</FormLabel>
              <Select placeholder="Chọn giới tính của bạn" value={formData.gender} onChange={handleChange}>
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </Select>
            </FormControl>
            <FormControl id="birthDate">
              <FormLabel>Ngày sinh</FormLabel>
              <Input type="date" placeholder="Chọn ngày sinh của bạn" value={formData.birthDate} onChange={handleChange} />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" mt={4}  >
              Đăng Ký
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
        </Text>
      </Box>
      <Box
        className="illustration"
        w="50%"
        display={{ base: 'none', md: 'block' }}
      >
        <Image
          src="./CauVangDaNang-1654082224-7229-1654082320.jpg"
          alt="illustration"
          objectFit="cover"
          w="830px"
          h="100%"
          m = "50px"
          borderRadius="30px"
        />
      </Box>
    </Flex>
  );
};

export default Register;
