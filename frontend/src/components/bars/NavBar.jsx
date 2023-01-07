import { Button, Center, HStack, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { Logo } from '../../utils/icon'
import CusSpacer from '../util/CusSpacer'

export default function NavBar({ palette, loggedIn, children, showLoginButton, signingUp, centered }) {
    return (
        <HStack bgColor={palette.primary} w="100vw" h="6vh" spacing={0}>
            <HStack spacing={0}>
                <Logo w="5vh" h="5vh" marginLeft="1" />
                <CusSpacer palette={palette} />
                <Text fontSize="2xl">Budgetting</Text>
            </HStack>
            {centered ? <HStack pos="absolute" zIndex={10} w="100vw"><Center w="100vw">{children}</Center></HStack>
                : 
                <HStack>{ children }</HStack>
                }
            <Spacer />
            {showLoginButton && <>{
                loggedIn ? <Button bgColor={palette.tertiary}>Account</Button> : <>
                    <Button bgColor={palette.tertiary}>Log In</Button>
                </>
            }</>}
            <CusSpacer palette={palette} />
        </HStack>
    )
}
