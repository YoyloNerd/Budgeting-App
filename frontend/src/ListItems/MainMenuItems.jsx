import { Button } from '@chakra-ui/react'
import React from 'react'

export default function MainMenuItems({palette,text,selected}) {
  return (
    <>
    <Button bgColor={selected?palette.accent:palette.primary}>
        {text}
    </Button>
    </>
  )
}
