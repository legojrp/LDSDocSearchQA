import React, { useState } from 'react';
import { ChakraProvider, Box, Flex, Heading, Textarea, Button, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Header from './components/Header';
import SearchResults from './components/SearchResults';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false); // Track if search has been made

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true); // Set searched to true after starting the search
    // Simulate fetching results
    try {
      const response = await fetch('/api/search?query=' + searchQuery);
      const data = await response.json();
      setResults({answer: data.answer, references : data.references });
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAgain = () => {
    // Reset the search state and results for a new search
    setSearchQuery('');
    setResults([]);
    setSearched(false); // Allow the search bar to reset to the middle
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <Header />
        <Flex direction="column" align="center" mt={5}>
          {/* Search Bar and Button */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{
              opacity: searched ? 0 : 1, // Hide search bar after search
              x: searched ? -200 : 0,   // Move the search bar to the left after search
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ width: '100%', maxWidth: '500px', padding: '10px' }}
          >
            <Textarea
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your search query..."
              size="lg" // Larger size for better visibility
              minHeight="150px" // Allows for at least half a paragraph
              resize="vertical" // Allows resizing vertically
              mb={3} // Add some margin to the bottom
            />
            {!searched && (
              <Button onClick={handleSearch} colorScheme="blue" width="100%" size="lg">
                Search
              </Button>
            )}
          </motion.div>

          {/* Loading Spinner or Search Results */}
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 200 }} // Start with results off-screen
              animate={{
                opacity: searched ? 1 : 0, // Make results visible after search
                x: searched ? 0 : 200, // Move results into position
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SearchResults results={results} />
            </motion.div>
          )}

          {/* Search Again Button */}
          {searched && (
            <Button mt={4} onClick={handleSearchAgain} colorScheme="blue">
              Search Again
            </Button>
          )}
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
