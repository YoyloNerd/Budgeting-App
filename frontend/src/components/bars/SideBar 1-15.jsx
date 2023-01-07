import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import MainMenuItems from '../../ListItems/MainMenuItems'
import CusSpacer from '../util/CusSpacer'

export default function SideBar1015({ palette }) {
  return (<HStack>
    <CusSpacer palette={palette} />
    <VStack bgColor={palette.secondary} w="6vw" h="90vh">
    <CusSpacer palette={palette} />
      <MainMenuItems palette={palette} text="Home" selected={true} />
    </VStack>
  </HStack>
  )
}
