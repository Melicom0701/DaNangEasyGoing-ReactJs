import { Text, Tooltip,Box, Flex, Input ,InputGroup,InputLeftAddon, Image} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from '@chakra-ui/react'

var _Menu = [
    {name: "Ga Ran",
    },
    {
    name : "Banh Mi",
    },
    {
    name : "Banh Canh",
    },
    {
    name : "Banh Xeo",
    },
    {
    name : "Banh Trang Tron Thit Ga Trung Cut",
    }
]


export default function Menu()
{

    const TruncatedText = (text, maxLength) => {
        const truncatedText =
          text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    
        return <div className="truncated-text">{truncatedText}</div>;
      };
    const UpperCase = (text) => {
        return text.toUpperCase();
    }


    return (
        <>
            <Flex direction="column">

                    <Box  bg="white" boxShadow="lg" p="20px" borderRadius="lg" w="250px" color="gray"> 
                    {
                        _Menu.map((item) => {
                            return (
                                <> 
                                
                                <Flex padding="5px"  >
                                    <Tooltip label={item.name}>
                                    <Text>
                                        {TruncatedText(UpperCase(item.name),18)}
                                    </Text>
                                    </Tooltip> 
                                </Flex>   
                                
                                </>
                            )
                        })
                    }
                    </Box>
        


            </Flex>
        
        </>
    );




}