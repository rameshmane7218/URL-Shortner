import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useState,
} from "react";

import copy from "copy-to-clipboard";

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { dataProps, getShortUrlAPI, resultProps } from "../action/actions";
import { CopyIcon } from "@chakra-ui/icons";

const initialState = {
    longUrl: "",
    customName: "",
};

const initialResult = {
    message: "",
    data: "",
};

const Home = () => {
    const [data, setData] = useState<dataProps>(initialState);
    const [result, setResult] = useState<resultProps>(initialResult);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);
    const [invalidUrl, setInvalidUrl] = useState<boolean>(false);
    const toast = useToast();
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (result.data != "") {
            setResult({ ...initialResult });
        }
        if (invalidUrl) {
            setInvalidUrl(false);
        }
        if (invalid) {
            setInvalid(false);
        }
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let hostCheck = data.longUrl.slice(0, 5);
        // console.log(hostCheck, data.longUrl);
        if (hostCheck == "data:") {
            setInvalidUrl(true);
            toast({
                title: `Please enter correct url`,
                status: "error",
                duration: 2000,
                position: "top",
            });
            return;
        } else {
            getResult(data);
        }
        // console.log("form submitted");
        // console.log(data);
    };

    const handleCopy = () => {
        if (typeof result.data === "string") {
            copy(result.data);
            toast({
                title: "Text copied successfully",
                status: "success",
                duration: 1000,
                position: "top",
            });
        }
    };

    const getResult = (data: dataProps) => {
        setLoading(true);
        setError(false);
        setInvalid(false);
        setResult({ ...initialResult });
        getShortUrlAPI(data)
            .then((r) => {
                setResult(r);
                // console.log(r);
                toast({
                    title: `${r.message}`,
                    status: "success",
                    duration: 1000,
                    position: "top",
                });
            })
            .catch((err) => {
                setError(true);
                // console.log("Something went wrong", err);
                toast({
                    title: `${err?.response?.data?.message || err.message}`,
                    status: "warning",
                    duration: 1000,
                    position: "top",
                });
                if (err?.response?.data?.message == "Url Already Exist...") {
                    setInvalid(true);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Box >
            <form onSubmit={handleSubmit}>
                <Flex
                    maxWidth={"500px"}
                    margin={"auto"}
                    flexDir={"column"}
                    gap={"20px"}
                    p={"20px 30px"}
                    rounded={"md"}
                    boxShadow={
                        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
                    }
                    bg={useColorModeValue("white", "gray.700")}
                >
                    <FormControl isRequired>
                        <FormLabel>
                            Enter a long URL to make a ShortUrl
                        </FormLabel>
                        <Input
                            isInvalid={invalidUrl}
                            type="text"
                            name="longUrl"
                            value={data.longUrl}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl
                        style={{
                            display: `${result.data == "" ? "block" : "none"}`,
                        }}
                    >
                        <FormLabel>Customize your link</FormLabel>
                        <InputGroup>
                            <InputLeftAddon
                                children="https://kitty-love.herokuapp.com/"
                                maxW={"50%"}
                                fontSize={"13px"}
                                overflow={"hidden"}
                            />
                            <Input
                                isInvalid={invalid}
                                errorBorderColor="crimson"
                                placeholder="Enter custom name"
                                type={"text"}
                                name="customName"
                                value={data.customName}
                                onChange={handleOnChange}
                            />
                        </InputGroup>
                        <FormHelperText
                            color={"red"}
                            display={invalid ? "block" : "none"}
                            textAlign={"right"}
                        >
                            {"Url Name Already Exist..."}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        style={{
                            display: `${result.data != "" ? "block" : "none"}`,
                        }}
                    >
                        <FormLabel>Short Url</FormLabel>
                        <InputGroup>
                            <Input readOnly type="text" value={result.data} />
                            <InputRightElement>
                                <Button onClick={handleCopy}>
                                    <CopyIcon />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button
                        mt={"30px"}
                        isLoading={loading}
                        loadingText="Getting ready..."
                        colorScheme="teal"
                        variant="solid"
                        type="submit"
                    >
                        Make shortUrl
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};

export default Home;
