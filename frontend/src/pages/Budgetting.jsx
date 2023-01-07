import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import Main from '../components/bars/Main'
import SideBar1010 from '../components/bars/SideBar 1-10'
import SideBar1015 from '../components/bars/SideBar 1-15'

export default function Budgetting({ palette }) {
    return (
        <>
            <HStack spacing={0}>
                <SideBar1015 palette={palette} />
                <SideBar1010 palette={palette} />
                <Main palette={palette} />
            </HStack>
            <VStack spacing={0}>
                {/* {once ? (loggedIn ? <>
          
        </> : <>
          <Spacer />
          <Link href={googleRoute}><Image src='/btn_google_signin_dark_normal_web.png' /></Link>
          <Spacer />
        </>) : <Text>loading...</Text>} */}

                {/* Modal for creating account
      <Modal isOpen={isOpenCreateAccount} onClose={onCloseCreateAccounts} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input placeholder='Name' value={accountName} onChange={(e) => setAccountName(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => { createEmptyAccount() }}>
              Save
            </Button>
            <Button variant='ghost' onClick={onCloseCreateAccounts}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

                {/* <Modal isOpen={isOpenEditTransaction} onClose={onCloseEditTransaction} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input value={editTransactionName} onChange={(e) => setEditTransactionName(e.target.value)} />
              <Input value={editTransactionAmount} type="number" onChange={(e) => setEditTransactionAmount(new bigDecimal(e.target.value))} />
              {editTransactionType && <Select w="20vw" value={transactionType} onChange={(e) => { setEditTransactionType(e.target.value) }}>
                <option value='income'>income</option>
                <option value='expense'>expense</option>
              </Select>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => { saveEdittedTransaction() }}>
              Save
            </Button>
            <Button variant='ghost' onClick={onCloseEditTransaction}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
            </VStack >
        </>
    )
}
