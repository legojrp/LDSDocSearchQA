import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Flex, Heading, Textarea, Button, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Header from './components/Header';
import SearchResults from './components/SearchResults';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false); // Track if search has been made

  // Array of random placeholders
  const searchPlaceholders = [
  "What does the Bible teach about faith in Jesus Christ?",
  "How is repentance described in the Book of Mormon?",
  "What does the Bible say about charity?",
  "What do the scriptures teach about prayer?",
  "What is the meaning of covenants in the Old Testament?",
  "How can I receive blessings through the priesthood?",
  "What are the prophecies of Christ in Isaiah?",
  "How can I find eternal life according to Doctrine and Covenants?",
  "What scriptures provide comfort in times of trial?",
  "What is the significance of 'The Lord is my shepherd'?",
  "What does the Plan of Salvation teach us?",
  "How is grace and mercy explained in the New Testament?",
  "What is the parable of the Good Samaritan about?",
  "How can I endure to the end according to scripture?",
  "What is the process of repentance in scripture?",
  "How can I develop stronger faith in God?",
  "What do the scriptures teach about temples in the Book of Mormon?",
  "What happened to Jesus Christ in the Garden of Gethsemane?",
  "What is the Savior's role in salvation?",
  "What teachings about hope are found in Mormon scriptures?",
  "How can I overcome temptation according to scripture?",
  "What do the scriptures say about forgiveness?",
  "What does D&C 121:7-9 teach us?",
  "What does the Bible say about Christ's second coming?",
  "How is the Atonement described in the Old Testament?",
  "What do modern prophets teach about faith?"
  ];

  const [randomPlaceholder, setRandomPlaceholder] = useState('');

  // Set a random placeholder on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * searchPlaceholders.length);
    setRandomPlaceholder(searchPlaceholders[randomIndex]);
  }, []);

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
              placeholder={randomPlaceholder} // Use random placeholder here
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
