import { Card, CardBody, CardFooter, Heading, Image, Text, Divider, Box, Flex, Spacer} from "@chakra-ui/react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const saveItem= async (id) => {
    const API = process.env.REACT_APP_ENDPOINT+"destination/"+id+"/save";
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Vui lòng đăng nhập trước khi lưu");
        return;
    }
const requestOptions = {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
    },
};
await fetch(API, requestOptions)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data.message === "saved") {
            toast.success("Đã Lưu");
        } 
        else {
            toast.warn("Đã bỏ lưu");
        }
    })
    .catch((err) => {
        toast.error("Lưu thất bại");
        console.log(err);
    });

}
export default function CardItem({item}) {
    console.log(item);
    const TruncatedText = ( text, maxLength ) => {
        const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      
        return <div className="truncated-text">{truncatedText}</div>;
      };
    return (
    
        <div>
            
            
           
            <Card maxW="250px" h="320px" rounded="10px"
            _hover = {{boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)"}}
            >
                 <Link to={"/ShopReview/"+item.id}>
                <Heading>
                    <Image src={item.image} alt={item.title} />
                </Heading>
                <CardBody ml="10px" p="7px">
                    <Text fontSize="1xl"  as='b'>{item.title}</Text>
                    <Text fontSize="xs" color="#9B9B9B" >{TruncatedText(item.location,35)}</Text>
                   
                </CardBody>
                </Link>
                <Divider color="#dddddd" />

                <CardBody class="commentor" h="75px" p="5px" >
                    <Flex justify="center" align="center">
                    
                    <Box>
                        <Rate disabled value={item.rating}> </Rate>
                    </Box>
                    </Flex>
                    
                </CardBody>
                <Divider color ="#dddddd"/>
                <CardFooter  >
                   
                
                    <Text color="#E02525">{item.price}đ
                     </Text>
                    <Spacer />
                    <Text _hover = {{boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)"}} 
                        onClick = {() => 
                            saveItem(item.id)
                        }
                    >
                    <i class="fa fa-bookmark" aria-hidden="true" bg=""> </i> Lưu
                    </Text>
                   
                </CardFooter>
            </Card>
            <ToastContainer />
            
            
        
        
        </div>
    )

}

/*
"items": [
        {
            "id": 1,
            "title": "Bánh Tráng Trộn - Bé Nhớ",
            "localtion": "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",
            "image": "https://media.foody.vn/res/g1/708/s576x330/foody-banh-trang-tron-be-nho-1-635799073000070000.jpg",
            "price": "10.000đ",
            "rating": 4.5,
            "TopComment": {
                
                    "profilePicture": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2F1234popo%2Favt%2F&psig=AOvVaw0uvpFus6yny4ANL77buK1J&ust=1712276284809000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMC_uK-kp4UDFQAAAAAdAAAAABAE",
                    "content": "Ngon quá",
                    "author": "Nguyễn Văn A",
                    "noComments": 10
            }
        }
    ]
    */
