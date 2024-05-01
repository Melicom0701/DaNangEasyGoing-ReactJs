import { Text, Box, Flex, Input ,InputGroup,InputLeftAddon, Image ,Tooltip} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

var searchResult = [
    {
        name : "Banh Mi ",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng  Viet Nam Viet Nam",
    }
    ,{
        name : "Banh Canh",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Xeo",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Tron",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Nuong",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Tron",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Nuong",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Nuong",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Nuong",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Nuong",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    ,{
        name : "Banh Trang Nuong",
        image : "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg",
        location : "118 Lê Đình Lý, Quận Hải Châu, Đà Nẵng",

    }
    
]
//take only max 8 items from searchResult
searchResult = searchResult.slice(0,6);


export default function Search()
{
    const [onsearch, setonsearch] = useState(false);
    
    useEffect(() => {
        
    }
    ,[onsearch])


    const FinishSearchHandle = () => {
        setonsearch(false);
        console.log("SearchHandle");
    }
    const SearchHandle = (e) => {
        setonsearch(true);
        console.log(e.target.value);
    }
    const TruncatedText = (text, maxLength) => {
        const truncatedText =
          text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    
        return <div className="truncated-text">{truncatedText}</div>;
      };


    return (
        <>
            <Flex direction="column">
                <InputGroup  >
                <InputLeftAddon>
                <FaSearch/>
                </InputLeftAddon>
                <Input placeholder="Search" w="300px"  onBlur={FinishSearchHandle} onChange={SearchHandle}/>
                </InputGroup>
                {onsearch && (
                    <Box  bg="white" boxShadow="xl" p="20px" borderRadius="lg"> 
                    {
                        searchResult.map((item) => {
                            return (
                                <> 
                                <Flex padding="5px" >
                                    <Image src={item.image} alt={item.name} width="80px" p="0 10px 0 0 " borderRadius="5px"/>
                                    <Flex direction="column" >
                                        <Tooltip label={item.name}>
                                        <Text>
                                        {TruncatedText(item.name,18)}
                                        </Text>
                                        </Tooltip>
                                        <Tooltip label={item.location}>
                                        <Text fontSize="sm" color="gray" >
                                            {TruncatedText(item.location,48)}
                                        </Text>
                                        </Tooltip>

                                     </Flex>

                                </Flex>
                               
                                
                                </>
                            )
                        })
                    }
                </Box>)}

        


            </Flex>
        
        </>
    );




}