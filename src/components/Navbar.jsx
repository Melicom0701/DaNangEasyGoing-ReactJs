import { Flex, Box } from "@chakra-ui/react"
export default function Navbar(){

    return (
        <>
            <Flex bg="gray.200" justify="space-around" wrap ="wrap" gap="2">
                <Box w = "150px" h="50px" bg="red" >1 </Box>
                <Box w = "150px" h="50px" flexGrow="2" bg="green" >2 </Box>
                <Box w = "150px" h="50px" bg="yellow" >3 </Box>
                <Box w = "150px" h="50px" bg="blue" >4 </Box>

            </Flex>
        </>
    )
}