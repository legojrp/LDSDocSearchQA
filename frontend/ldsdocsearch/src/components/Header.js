import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function Header() {
  return (
    <Box textAlign="center" mb={5}>
      <Heading as="h1" size="xl">LDS Doc Search</Heading>
      <Text mt={2}>Search for church documents, talks, and more!</Text>
    </Box>
  );
}

export default Header;
