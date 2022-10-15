import {
    Box,
    chakra,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoLink } from "react-icons/io5";
const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            target={"_blank"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
            // position={"absolute"}
            bottom={0}
            left={0}
            right={0}
        >
            <Container
                as={Stack}
                maxW={"6xl"}
                py={4}
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align={{ base: "center", md: "center" }}
            >
                {/* <Logo /> */}
                <Flex
                    gap={2}
                    fontFamily={'"Quicksand", sans-serif'}
                    alignItems={"center"}
                >
                    <Image src={"./logo.png"} height={"30px"} />
                    <Heading fontSize={"22px"}>Short Url</Heading>
                </Flex>
                <Text>© 2022. All rights reserved</Text>
                <Text>Coded with 💙 by @rameshmane</Text>
                <Stack direction={"row"} spacing={6}>
                    <SocialButton
                        label={"Github"}
                        href={"https://github.com/rameshmane7218"}
                    >
                        <BsGithub />
                    </SocialButton>
                    <SocialButton
                        label={"Website"}
                        href={"https://rameshmane.gatsbyjs.io/"}
                    >
                        <IoLink />
                    </SocialButton>
                    <SocialButton
                        label={"Linkedin"}
                        href={
                            "https://www.linkedin.com/in/ramesh-mane-268a0014a/"
                        }
                    >
                        <BsLinkedin />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}
