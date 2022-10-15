import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import { Box, useColorModeValue } from "@chakra-ui/react";

function App() {
    return (
        <Box bg={useColorModeValue("gray.50", "gray.800")} height={"90vh"}>
            <Box className="App" height={"100%"} paddingBottom={"50px"}>
                <header className="header">
                    <nav>Short Url</nav>
                </header>
                <Home />
            </Box>
            <Footer />
        </Box>
    );
}

export default App;
