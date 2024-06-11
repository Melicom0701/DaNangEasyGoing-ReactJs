import ProfileEditor from '../components/ProfileEditor/ProfileEditor';
import SideBar from '../components/SideBar/SideBar';
import { Flex, Box } from '@chakra-ui/react';
export default function ProfileEdit() {
    return (
        <Flex backgroundColor="#e2e8f0"
        minHeight="100vh"
 >
            <Box position="fixed" p="20px">
                <SideBar _active="profile" />
            </Box>
            <Box width="300px"> 
            </Box>
            <Box p="16px" backgroundColor="white" width="1400px" m="30px" borderRadius="30px">
                <ProfileEditor />
            </Box>

        </Flex>
        
    )
}


{/* <>

<Flex
backgroundColor="#e2e8f0"
minHeight="100vh"

>

    <Box position="fixed" p="20px">
    <SideBar _active="saved" />
    </Box>
    <Box width="280px"> 
    </Box>
    <Box p="16px" backgroundColor="white" m="30px" borderRadius="30px">

        <Travel />
    </Box>
</Flex>
</> */}