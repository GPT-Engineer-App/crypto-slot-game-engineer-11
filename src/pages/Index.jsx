import React, { useState } from "react";
import { Box, Button, Flex, Heading, Image, Input, Text, useToast } from "@chakra-ui/react";
import { FaCoins, FaCreditCard, FaBitcoin, FaEthereum, FaLock, FaPlay, FaRedo } from "react-icons/fa";

const SYMBOLS = ["🍒", "🍊", "🍋", "🍉", "🔔", "⭐️", "🍀"];
const ROWS = 3;
const COLS = 5;

const Index = () => {
  const [slots, setSlots] = useState(
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null)),
  );
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const toast = useToast();

  const spin = () => {
    if (balance < bet) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough funds to place this bet.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setBalance(balance - bet);

    const newSlots = [];
    for (let i = 0; i < ROWS; i++) {
      const row = [];
      for (let j = 0; j < COLS; j++) {
        row.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      }
      newSlots.push(row);
    }
    setSlots(newSlots);

    // Check for wins and update balance
    // TODO: Implement win logic
    const winAmount = Math.floor(Math.random() * 10) * bet;
    setBalance(balance + winAmount);
    if (winAmount > 0) {
      toast({
        title: "You Win!",
        description: `Congratulations, you won ${winAmount} coins!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        <FaCoins /> Slot Machine <FaCoins />
      </Heading>

      <Flex justify="center" mb={8}>
        {slots.map((row, i) => (
          <Flex key={i} direction="column" mx={1}>
            {row.map((symbol, j) => (
              <Box key={j} border="1px solid gray" p={8} fontSize="4xl" textAlign="center">
                {symbol}
              </Box>
            ))}
          </Flex>
        ))}
      </Flex>

      <Text fontSize="2xl" textAlign="center" mb={4}>
        Balance: {balance} coins
      </Text>

      <Flex justify="center" mb={8}>
        <Input type="number" value={bet} onChange={(e) => setBet(parseInt(e.target.value))} mr={4} />
        <Button leftIcon={<FaPlay />} onClick={spin}>
          Spin
        </Button>
      </Flex>

      <Flex justify="center" mb={4}>
        <Button leftIcon={<FaCreditCard />} mr={4}>
          Visa/Mastercard
        </Button>
        <Button leftIcon={<FaBitcoin />} mr={4}>
          Bitcoin
        </Button>
        <Button leftIcon={<FaEthereum />}>Ethereum</Button>
      </Flex>

      <Flex align="center" justify="center">
        <FaLock />
        <Text ml={2}>Secure Payments Guaranteed</Text>
      </Flex>
    </Box>
  );
};

export default Index;
