import { SimpleGrid, Box } from "@chakra-ui/react";


export default function ProductContainer() {

    return (
        <SimpleGrid columns={3} spacing={10} minChildWidth="250px" >
            <Box w="100%" h="300px" bg="red.500" />
            <Box w="100%" h="300px" bg="green.500" />
            <Box w="100%" h="300px" bg="blue.500" />
            <Box w="100%" h="300px" bg="red.500" />
            <Box w="100%" h="300px" bg="green.500" />
            <Box w="100%" h="300px" bg="blue.500" />
        </SimpleGrid>
    )
}