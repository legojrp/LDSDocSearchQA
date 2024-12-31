import React from 'react';
import { Input, Button, Stack } from '@chakra-ui/react';

function SearchBar({ query, setQuery, onSearch }) {
  return (
    <Stack direction="row" spacing={4} align="center">
      <Input
        placeholder="Search LDS documents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="lg"
        width="50%"
      />
      <Button colorScheme="blue" size="lg" onClick={onSearch}>
        Search
      </Button>
    </Stack>
  );
}

export default SearchBar;
