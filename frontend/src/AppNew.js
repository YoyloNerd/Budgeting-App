import {
  Box, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Select, Input, Button, Text, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Stat, StatLabel, StatNumber
  , StatHelpText, Tag, Center, Switch, Spacer, Link, FormControl, Image, ChakraProvider, extendTheme
} from '@chakra-ui/react'
import bigDecimal from 'js-big-decimal';
import axios from 'axios';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import curColorPalette from './utils/colorScheme/curColorPalette';
import NavBar from './components/bars/NavBar';
import CusSpacer from './components/util/CusSpacer';
import Budgetting from './pages/Budgetting';
function App() {
  const palette = curColorPalette();
  const { isOpen: isOpenCreateAccount, onOpen: onOpenCreateAccount, onClose: onCloseCreateAccounts } = useDisclosure()
  const { isOpen: isOpenEditTransaction, onOpen: onOpenEditTransaction, onClose: onCloseEditTransaction } = useDisclosure()

  const googleRoute = process.env.REACT_APP_BASE_URL ? `http://localhost:5000/api/auth/google` : "/api/auth/google";

  React.useEffect(() => {
    // if (!once) {
    //   let curDate = new Date()
    //   let curMonth = months[curDate.getMonth()]
    //   let curYear = curDate.getFullYear()
    //   setDate([curMonth, curYear])
    //   axios.get('/api/auth/user', { withCredentials: true }).then(res => {
    //     if (res.data !== "No user") {
    //       setLoggedIn(true)
    //       setUser(res.data)
    //       setAccounts(res.data.accounts)
    //     }
    //   }).then(() => {
    //     setOnce(true)
    //   })
    // }
  }, [])
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
  return (
    <ChakraProvider theme={extendTheme({ config, styles: { global: (props) => ({ body: { bg: palette.primary } }) } })}>
      {/* <Box bg={palette.primary} h='1vh' w='100vw' />
      <Box bg={palette.secondary} h='1vh' w='100vw' />
      <Box bg={palette.tertiary} h='1vh' w='100vw' /> */}
      <NavBar palette={palette} showLoginButton />
      <CusSpacer palette={palette} />
      <Budgetting palette={palette} />
    </ChakraProvider>
  );
}

export default App;
