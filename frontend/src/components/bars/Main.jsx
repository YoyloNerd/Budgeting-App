import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import CusSpacer from '../util/CusSpacer'

export default function Main({palette}) {
  return (<HStack>
    <CusSpacer palette={palette} />
    <VStack borderRadius={15} bgColor={palette.secondary} w="79vw" h="90vh">

    </VStack>
  </HStack>
  )
}
