
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
    Image,
    Text,
} from '@chakra-ui/react';
import { BiChat, BiLike,BiHeart, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';


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
const item = {
    "id": "1",
    "title": "json-server",
    "location": "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",
    "author": "Linh Nguyen",
    "author_avatar": "https://i.pinimg.com/280x280_RS/2f/74/37/2f74373760dd9a657517b19e635318d5.jpg",
    "context": "Món ăn ở đây cực kì độc đáo",
    "image": "https://images.foody.vn/res/g100001/1000000322/prof/s576x330/beauty-upload-api-file_8d66bc45-86f2-4dc0-9ce7-c94bac4f6e3b-200521104545.jpeg"
}


export default function Review(props) {
    props = { item }
    return (
        console.log(props),

        <Card maxW='650px' margin="0 0 20px 0">
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                            <Heading size='sm'>{props.item.author}</Heading>
                            <Text>{props.item.location}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {props.item.context}
                </Text>
            </CardBody>
            <Image
                objectFit='cover'
                src={props.item.image}
            />

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <Button flex='1' variant='ghost' leftIcon={<BiHeart />}>
                    Thích 
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                Bình Luận
                </Button>
            </CardFooter>
        </Card>
    )
}