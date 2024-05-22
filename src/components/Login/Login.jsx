import React, { useState, useEffect } from 'react';
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
	Text,
	useToast,
} from '@chakra-ui/react';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const isLogin = localStorage.getItem('token');
	const toast = useToast();

	useEffect(() => {
		if (isLogin) {
			navigate('/');
		}
	}, [isLogin, navigate]);

	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleShowClick = () => setShowPassword(!showPassword);

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

	const handleLogin = (e) => {
		e.preventDefault();
		const loginAPI = `${process.env.REACT_APP_ENDPOINT}auth/login`;
		fetch(loginAPI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					notifyError(data.error);
				} else {
					notifySuccess('Đăng Nhập Thành Công');
					localStorage.setItem('token', data.token);
				}
			})
			.catch((error) => {
				console.log('Error', error);
				notifyError(error.message);
			});
	};

	return (
		<Flex
			className="wrapper signIn"
			minH="100vh"
			align="center"
			justify="center"
			bg="gray.200"
		>
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
          borderRadius="30px"
				/>
			</Box>
			<Box borderRadius="10px" className="form" w={{ base: '90%', md: '40%' }} p={8} bg="white" boxShadow="md">
				<Heading as="h2" size="xl" mb={6} textAlign="center">
        Đăng Nhập 
				</Heading>
				<form onSubmit={handleLogin}>
					<FormControl id="username" mb={4}>
						<FormLabel>Tên Đăng Nhập</FormLabel>
						<Input
							type="text"
							placeholder="Nhập vào tên đăng nhập"
							value={username}
							onChange={handleUsernameChange}
						/>
					</FormControl>
					<FormControl id="password" mb={4}>
						<FormLabel>Mật Khẩu</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? 'text' : 'password'}
								placeholder="Nhập vào Mật Khẩu"
								value={password}
								onChange={handlePasswordChange}
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleShowClick}>
									{showPassword ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					<Button type="submit" colorScheme="teal" width="full" mt={4}>
						Submit
					</Button>
				</form>
				<Text mt={4} textAlign="center">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</Text>
			</Box>
		</Flex>
	);
};

export default Login;
