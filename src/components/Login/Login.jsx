import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('token');
    useEffect(() => {
        if (isLogin) {
            navigate("/");


        }
    },[isLogin]);
  const SuscessNotify =(prompt)=>
  {
    toast.success(prompt);
    navigate("/");
  }
  const ErrorNotify =(prompt)=>
  {
    toast.error(prompt);
  }

  const _login = (e) => {
      e.preventDefault();
      const loginAPI = process.env.REACT_APP_ENDPOINT+"auth/login";
      fetch(loginAPI, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username,
              password: password,
          }),

      })
      .then(response => response.json())
      .then(data => {
        if (data.error)
        {
          ErrorNotify(data.error)
        }
        else
        {
          SuscessNotify("Đăng Nhập Thành Công")
          //save cookie
          localStorage.setItem("token",data.token);


        }
      })
      .catch((error) => {
        console.log("Err" ,error)
        ErrorNotify(error)
          
      });

  }

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
    <ToastContainer />
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="Email hoặc tên đăng nhập"
                  onChange={handleUsernameChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật Khẩu"
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={_login}
              >
                Đăng Nhập
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
      Chưa có tài khoản? ?{" "}
        <Link color="teal.500" href="#">
          Đăng Ký 
        </Link>
      </Box>
    </Flex>
    </>
  );
  
};

export default Login;
