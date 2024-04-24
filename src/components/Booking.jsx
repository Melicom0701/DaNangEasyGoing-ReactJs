import { Card, CardBody, CardFooter, Heading, Image, Text, Divider, Box, Flex, Spacer} from "@chakra-ui/react";
import '@fortawesome/fontawesome-free/css/all.min.css';



export default function Booking({item}) {
    const TruncatedText = ( text, maxLength ) => {
        const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      
        return <div className="truncated-text">{truncatedText}</div>;
      };
    console.log("vao roi "  + item.title)
    return (
        <>
            <Card maxW="250px" h="320px" rounded="10px"
            _hover = {{boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)"}}
            >
                <Heading>
                    <Image src={item.image} alt={item.title} />
                </Heading>
                <CardBody ml="10px" p="7px">
                    <Text fontSize="1xl"  as='b'>{item.title}</Text>
                    <Text fontSize="xs" color="#9B9B9B" >{TruncatedText(item.location,35)}</Text>
                   
                </CardBody>
        
                <Divider color ="#dddddd"/>
                <CardFooter  >
                   
                
                    <Text color="#ff6d1f">{item.price}đ
                     </Text>
                    <Spacer />
                    <Text>
                    <i class="fa fa-bookmark" aria-hidden="true" bg=""> </i> Lưu
                    </Text>
                   
                </CardFooter>
            </Card>

        
        
        </>
    )

}

/* {
            "id":1,
            "title":"Sun World Ba Na Hills tại Đà Nẵng ",
            "location":"Hòa Phú, Hòa Vang, Đà Nẵng",
            "image":"https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000908871772/Sun-World-Ba-Na-Hills-in-Da-Nang--ce8d864c-da07-4dc0-91db-f320fa9fbbeb.jpeg?_src=imagekit&tr=c-at_max,h-750,q-100,w-1000",
            "price":"500.000",
            "rating":4.5
        }
    */
