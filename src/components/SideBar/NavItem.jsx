
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";
import React from "react";





export default function NavItem({ navSize, title, icon,active,link }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    href={link}
                    backgroundColor={active && "blue.400"}
                    p={3}
                    borderRadius={8}
                    _hover={{
                        textDecoration: "none",
                        backgroundColor: "blue.100",
                    }}
                    w={navSize == "large" && "100%"}

                >
                    <MenuButton w="100%">
                        <Flex Color={active?"blue.400":"white"}>
                            <Icon as={icon} fontSize="xl" />
                            <Text ml={5} display={navSize=="small"?"none":"flex"}>  {title}</Text>

                        </Flex>
                    </MenuButton>
                </Link>

            </Menu>

        </Flex>
    )
}