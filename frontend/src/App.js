import {
  Box, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Select, Input, Button, Text, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Stat, StatLabel, StatNumber
  , StatHelpText, Tag, Center, Switch, Spacer, Link, FormControl, Image
} from '@chakra-ui/react'
import bigDecimal from 'js-big-decimal';
import axios from 'axios';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const { isOpen: isOpenCreateAccount, onOpen: onOpenCreateAccount, onClose: onCloseCreateAccounts } = useDisclosure()
  const { isOpen: isOpenEditTransaction, onOpen: onOpenEditTransaction, onClose: onCloseEditTransaction } = useDisclosure()
  const [date, setDate] = useState([])
  const [once, setOnce] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [months,] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
  const [selectedAccount, setSelectedAccount] = useState(0)
  const [accounts, setAccounts] = useState(null)

  const [accountName, setAccountName] = useState()
  const [user, setUser] = useState()

  const [editTransaction, setEditTransaction] = useState()
  const [editTransactionAmount, setEditTransactionAmount] = useState(0)
  const [editTransactionName, setEditTransactionName] = useState()
  const [editTransactionType, setEditTransactionType] = useState("expense")

  const [monthlyIncomeAmount, setMonthlyIncomeAmount] = useState(0)
  const [monthlyIncomeName, setMonthlyIncomeName] = useState()
  const [monthlyExpensesAmount, setMonthlyExpensesAmount] = useState(0)
  const [monthlyExpensesName, setMonthlyExpensesName] = useState()
  const [transactionAmount, setTransactionAmount] = useState(0)
  const [transactionName, setTransactionName] = useState()
  const [transactionType, setTransactionType] = useState("expense")

  const selectAccount = (e) => {
    setSelectedAccount(e)
    const currentData = accounts[e].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    console.log(
      e,
      accounts[e]
    )
  }
  const createEmptyAccount = () => {
    let curMonths = []
    for (let i = 0; i < 12; i++) {
      curMonths.push({
        month: months[i],
        balance: 0,
        monthlyIncome: [],
        monthlyExpenses: [],
        transactions: []
      })
    }
    const newAccount = {
      name: accountName,
      years: [{
        year: date[1],
        months: curMonths
      }]
    }
    axios.post("/api/accounting/update", { accounts: [...accounts, newAccount] }, { withCredentials: true }).then(res => {
      if (res.data !== "No user") {
        setUser(res.data)
        setAccounts(res.data.accounts)
      }
    })
    setAccountName("")
    onCloseCreateAccounts()
  }
  const addMonthlyIncome = () => {
    let uuid = uuidv4()
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    currentData.monthlyIncome.push({
      uuid: uuid,
      name: monthlyIncomeName,
      amount: monthlyIncomeAmount
    })
    setMonthlyIncomeName("")
    setMonthlyIncomeAmount(0)
    setAccounts(accounts)
    updateBalance()
  }
  const deleteMonthlyIncome = (uuid) => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    currentData.monthlyIncome = currentData.monthlyIncome.filter(income => income.uuid !== uuid)
    //if next months and/or years exist, delete the income from them as well
    if (months.indexOf(date[0]) !== 11) {
      for (let i = months.indexOf(date[0]) + 1; i < 12; i++) {
        currentData.months[i].monthlyIncome = currentData.months[i].monthlyIncome.filter(income => income.uuid !== uuid)
      }
    }
    let yearindex = 0
    for (let i = 0; i < accounts[selectedAccount].years.length; i++) {
      if (accounts[selectedAccount].years[i].year === date[1]) {
        yearindex = i
      }
    }
    if (yearindex < accounts[selectedAccount].years.length - 1) {
      for (let i = yearindex + 1; i < accounts[selectedAccount].years.length; i++) {
        for (let j = 0; j < 12; j++) {
          accounts[selectedAccount].years[i].months[j].monthlyIncome = accounts[selectedAccount].years[i].months[j].monthlyIncome.filter(income => income.uuid !== uuid)
        }
      }
    }
    setAccounts(accounts)
    updateBalance()
  }
  const addMonthlyExpenses = () => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    let uuid = uuidv4()
    currentData.monthlyExpenses.push({
      uuid: uuid,
      name: monthlyExpensesName,
      amount: monthlyExpensesAmount
    })
    setMonthlyExpensesName("")
    setMonthlyExpensesAmount(0)
    setAccounts(accounts)
    updateBalance()
  }
  const deleteMonthlyExpenses = (uuid) => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    currentData.monthlyExpenses = currentData.monthlyExpenses.filter(expense => expense.uuid !== uuid)

    setAccounts(accounts)
    updateBalance()
  }
  const addTransaction = () => {
    let uuid = uuidv4()
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    currentData.transactions.push({
      uuid: uuid,
      name: transactionName,
      amount: transactionAmount,
      type: transactionType
    })
    setTransactionName("")
    setTransactionAmount(0)
    setAccounts(accounts)
    updateBalance()
  }
  const deleteTransaction = (uuidv4) => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    currentData.transactions = currentData.transactions.filter(transaction => transaction.uuid !== uuidv4)

    setAccounts(accounts)
    updateBalance()
  }
  const updateBalance = () => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    let balance = new bigDecimal(0);
    currentData.monthlyIncome.forEach(income => {
      balance = balance.add(new bigDecimal(income.amount))
    })
    currentData.monthlyExpenses.forEach(expense => {
      balance = balance.subtract(new bigDecimal(expense.amount))
    })
    currentData.transactions.forEach(transaction => {
      if (transaction.type === "expense") {
        balance = balance.subtract(new bigDecimal(transaction.amount))
      } else {
        balance = balance.add(new bigDecimal(transaction.amount))
      }
    })
    currentData.balance = balance.getValue()
    setAccounts(accounts)
    axios.post("/api/accounting/update", { accounts: accounts }, { withCredentials: true }).then(res => {
      if (res.data !== "No user") {
        setUser(res.data)
        setAccounts(res.data.accounts)
      }
    })
  }
  const updateAll = () => {
    accounts.forEach(account => {
      account.years.forEach(year => {
        year.months.forEach(month => {
          let balance = new bigDecimal(0);
          month.monthlyIncome.forEach(income => {
            balance = balance.add(new bigDecimal(income.amount))
          })
          month.monthlyExpenses.forEach(expense => {
            balance = balance.subtract(new bigDecimal(expense.amount))
          })
          month.transactions.forEach(transaction => {
            if (transaction.type === "expense") {
              balance = balance.subtract(new bigDecimal(transaction.amount))
            } else {
              balance = balance.add(new bigDecimal(transaction.amount))
            }
          })
          month.balance = balance.getValue()
        })
      })
    })
    setAccounts(accounts)
    axios.post("/api/accounting/update", { accounts: accounts }, { withCredentials: true }).then(res => {
      if (res.data !== "No user") {
        setUser(res.data)
        setAccounts(res.data.accounts)
      }
    })
  }

  const loadEditTransaction = (uuid) => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    //load monthley income or expense or transaction
    let transaction = currentData.monthlyIncome.filter(income => income.uuid === uuid)[0]
    if (transaction) {
      setEditTransactionName(transaction.name)
      setEditTransactionAmount(transaction.amount)
      setEditTransactionType(null)
    }
    transaction = currentData.monthlyExpenses.filter(expense => expense.uuid === uuid)[0]
    if (transaction) {
      setEditTransactionName(transaction.name)
      setEditTransactionAmount(transaction.amount)
      setEditTransactionType(null)
    }
    transaction = currentData.transactions.filter(transaction => transaction.uuid === uuid)[0]
    if (transaction) {
      setEditTransactionName(transaction.name)
      setEditTransactionAmount(transaction.amount)
      setEditTransactionType(transaction.type)
    }
    onOpenEditTransaction()
    setEditTransaction(uuid)
  }
  const saveEdittedTransaction = () => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    //load monthley income or expense or transaction
    let transaction = currentData.monthlyIncome.filter(income => income.uuid === editTransaction)[0]
    if (transaction) {
      transaction.name = editTransactionName
      transaction.amount = editTransactionAmount
    }
    transaction = currentData.monthlyExpenses.filter(expense => expense.uuid === editTransaction)[0]
    if (transaction) {
      transaction.name = editTransactionName
      transaction.amount = editTransactionAmount
    }
    transaction = currentData.transactions.filter(transaction => transaction.uuid === editTransaction)[0]
    if (transaction) {
      transaction.name = editTransactionName
      transaction.amount = editTransactionAmount
      transaction.type = editTransactionType
    }
    setAccounts(accounts)
    updateBalance()
    onCloseEditTransaction()
  }

  const copyLastMonth = () => {
    const currentData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0]
    //if month is january, copy from december of previous year
    if (months.indexOf(date[0]) === 0) {
      const previousData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1] - 1)[0].months.filter(monthData => monthData.month === "December")[0]
      currentData.monthlyIncome = previousData.monthlyIncome
      currentData.monthlyExpenses = previousData.monthlyExpenses
      currentData.transactions = []
      currentData.balance = previousData.balance
    } else {
      const previousData = accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === months[months.indexOf(date[0]) - 1])[0]
      currentData.monthlyIncome = previousData.monthlyIncome
      currentData.monthlyExpenses = previousData.monthlyExpenses
      currentData.transactions = []
      currentData.balance = previousData.balance
    }
    setAccounts(accounts)
    updateBalance()
  }

  const nextMonth = () => {
    const monthIndex = months.indexOf(date[0])
    if (monthIndex === 11) {
      setDate([months[0], date[1]])
    } else {
      setDate([months[monthIndex + 1], date[1]])
    }
    updateBalance()
  }
  const previousMonth = () => {
    const monthIndex = months.indexOf(date[0])
    if (monthIndex === 0) {
      setDate([months[11], date[1]])
    } else {
      setDate([months[monthIndex - 1], date[1]])
    }
    updateBalance()
  }
  const nextYear = () => {
    // check if year exists
    if (accounts[selectedAccount].years.filter(yearData => yearData.year === date[1] + 1).length > 0) {
      setDate([date[0], date[1] + 1])
    }
    else {
      // create new year
      let newMonths = []
      months.forEach(month => {
        newMonths.push({
          month: month,
          balance: accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === "December")[0].balance,
          monthlyIncome: accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === "December")[0].monthlyIncome,
          monthlyExpenses: accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === "December")[0].monthlyExpenses,
          transactions: []
        })
      })

      const newYear = {
        year: date[1] + 1,
        months: newMonths
      }
      let tempAccounts = accounts;
      tempAccounts[selectedAccount].years.push(newYear);
      setAccounts(tempAccounts);
      setDate([date[0], date[1] + 1])
    }
    updateBalance()
  }
  const previousYear = () => {
    //check if year exists
    if (accounts[selectedAccount].years.filter(yearData => yearData.year === date[1] - 1)[0]) {
      setDate([date[0], date[1] - 1])
    }
    else {
      //create new year
      let newMonths = [];
      months.forEach(month => {
        newMonths.push({
          month: month,
          balance: 0,
          monthlyIncome: [],
          monthlyExpenses: [],
          transactions: []
        })
      })
      const newYear = {
        year: date[1] - 1,
        months: newMonths
      }
      let tempAccounts = accounts
      tempAccounts[selectedAccount].years.push(newYear)
      setAccounts(tempAccounts)
      setDate([date[0], date[1] - 1])
    }
    updateBalance()
  }
  const deleteAccount = (index) => {
    accounts.splice(index, 1)
    setAccounts(accounts)
    setSelectedAccount(0)
    updateAll()
  }

  const googleRoute = process.env.REACT_APP_BASE_URL ? `http://localhost:5000/api/auth/google` : "/api/auth/google";

  React.useEffect(() => {
    if (!once) {
      let curDate = new Date()
      let curMonth = months[curDate.getMonth()]
      let curYear = curDate.getFullYear()
      setDate([curMonth, curYear])
      axios.get('/api/auth/user', { withCredentials: true }).then(res => {
        if (res.data !== "No user") {
          setLoggedIn(true)
          setUser(res.data)
          setAccounts(res.data.accounts)
        }
      }).then(() => {
        setOnce(true)
      })
    }
  }, [months])

  return (
    <VStack spacing={0}>
      <Box h="5vh">
        {user && <Text>{user.displayName}</Text>}
      </Box>
      <VStack minH="90vh" w="70vw" borderWidth={5} borderRadius={25}>
        {once ? (loggedIn ? (accounts && <>
          <HStack>
            <Text>Accounts</Text>
            <Button onClick={onOpenCreateAccount}>
              <Text>+</Text>
            </Button>
          </HStack>
          <Tabs isFitted variant='enclosed' w="65vw" value={selectedAccount} onChange={selectAccount}>
            <TabList>
              {user.accounts.map((account, i) => (
                <Tab key={account.name + account.uuid}>
                  {account.name}
                </Tab>
              ))}
            </TabList>

            <Center>
              <TabPanels>
                {user.accounts.map((account, i) => (
                  <TabPanel key={`account:${account.uuid}`}>
                    <HStack w="60vw">
                      <Text w="30vw">{account.name}</Text>
                      <Stat w="30vw">
                        <StatLabel>Balance</StatLabel>
                        <StatNumber>{`${accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0].balance} EUR`}</StatNumber>
                      </Stat>
                      {i !== 0 ? <HStack><Text>Delete?</Text><Button onClick={() => { deleteAccount(i) }} ml={2} size="xs" colorScheme="red">X</Button></HStack> : null}
                    </HStack>
                    <HStack w="60vw">
                      <Button onClick={() => { previousYear() }}>Prev</Button>
                      <Center w="9vw"><Text>{date[1]}</Text></Center>
                      <Button onClick={() => { nextYear() }}>Next</Button>
                      <Button onClick={() => { previousMonth() }}>Prev</Button>
                      <Center w="9vw"><Text>{date[0]}</Text></Center>
                      <Button onClick={() => { nextMonth() }}>Next</Button>
                      <Button onClick={() => { copyLastMonth() }}>copy last month</Button>
                    </HStack>
                    <Tabs isFitted variant='enclosed' w="60vw"
                    // value={selectedAccount} onChange={setSelectedAccount}
                    >
                      <TabList>
                        <Tab>Monthly Income</Tab>
                        <Tab>Monthly Expence</Tab>
                        <Tab>Transactions</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel key="panel1">
                          <FormControl>
                            <HStack>
                              <Input
                                placeholder='name'
                                value={monthlyIncomeName}
                                onChange={(e) => { setMonthlyIncomeName(e.target.value) }}
                              />
                              <Input
                                placeholder='amount'
                                value={monthlyIncomeAmount}
                                type="number"
                                onChange={(e) => { setMonthlyIncomeAmount(e.target.value) }}
                              />
                              <Button onClick={() => { addMonthlyIncome() }}>add</Button>
                            </HStack>
                          </FormControl>
                          {accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0].monthlyIncome.map((transaction, i) => (
                            <HStack key={transaction.uuid}>
                              <Text>{`€ ${transaction.amount}`}</Text>
                              <Text>{transaction.name}</Text>
                              <Spacer />
                              <Button onClick={() => { loadEditTransaction(transaction.uuid) }}>edit</Button>
                              <Button onClick={() => { deleteMonthlyIncome(transaction.uuid) }}>delete</Button>
                            </HStack>
                          ))}
                        </TabPanel>
                        <TabPanel key="panel2">
                          <FormControl>
                            <HStack>
                              <Input
                                placeholder='name'
                                value={monthlyExpensesName}
                                onChange={(e) => { setMonthlyExpensesName(e.target.value) }}
                              />
                              <Input
                                placeholder='amount'
                                value={monthlyExpensesAmount}
                                type="number"
                                onChange={(e) => { setMonthlyExpensesAmount(e.target.value) }}
                              />
                              <Button onClick={() => { addMonthlyExpenses() }}>add</Button>
                            </HStack>
                          </FormControl>
                          {accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0].monthlyExpenses.map((transaction, i) => (
                            <HStack key={transaction.uuid}>
                              <Text>{`€ ${transaction.amount}`}</Text>
                              <Text>{transaction.name}</Text>
                              <Spacer />
                              <Button onClick={() => { loadEditTransaction(transaction.uuid) }}>edit</Button>
                              <Button onClick={() => { deleteMonthlyExpenses(transaction.uuid) }}>delete</Button>
                            </HStack>
                          ))}
                        </TabPanel>
                        <TabPanel key="panel3">
                          <FormControl>
                            <HStack>
                              <Input
                                placeholder='name'
                                value={transactionName}
                                onChange={(e) => { setTransactionName(e.target.value) }}
                              />
                              <Input
                                placeholder='amount'
                                value={transactionAmount}
                                type="number"
                                onChange={(e) => {
                                  setTransactionAmount(e.target.value)
                                }}
                              />
                              <Select w="20vw" value={transactionType} onChange={(e) => { setTransactionType(e.target.value) }}>
                                <option value='income'>income</option>
                                <option value='expense'>expense</option>
                              </Select>
                              <Button onClick={() => { addTransaction() }}>add</Button>
                            </HStack>
                          </FormControl>

                          {accounts[selectedAccount].years.filter(yearData => yearData.year === date[1])[0].months.filter(monthData => monthData.month === date[0])[0].transactions.map((transaction, i) => (
                            <HStack key={transaction.uuid}>
                              <Text>{`€ ${transaction.amount}`}</Text>
                              <Text>{transaction.name}</Text>
                              <Text bgColor={transaction.type === "expense" ? "red.300" : "green.300"}>{transaction.type}</Text>
                              <Spacer />
                              <Button onClick={() => { loadEditTransaction(transaction.uuid) }}>edit</Button>
                              <Button onClick={() => { deleteTransaction(transaction.uuid) }}>delete</Button>
                            </HStack>
                          ))}
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                ))}
              </TabPanels>
            </Center>
          </Tabs>
        </>) : <>
          <Spacer />
          <Link href={googleRoute}><Image src='/btn_google_signin_dark_normal_web.png' /></Link>
          <Spacer />
        </>) : <Text>loading...</Text>}
      </VStack>
      <Box h="5vh" />

      {/* Modal for creating account */}
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
      </Modal>

      <Modal isOpen={isOpenEditTransaction} onClose={onCloseEditTransaction} isCentered>
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
      </Modal>
    </VStack >
  );
}

export default App;
