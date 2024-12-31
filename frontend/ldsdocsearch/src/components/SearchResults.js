import React from 'react';
import { Box, SimpleGrid, Text, Spinner, Heading } from '@chakra-ui/react';

function SearchResults({ results }) {

  const [answers, setAnswers] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (results.length === 0) {
      setAnswers(null);
      setLoading(false);
    } else {
      setLoading(true);
      fetch(`http://localhost:3050/references?query=${JSON.stringify(results.references)}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAnswers(data);
          setLoading(false);
        });
    }
  }, [results]);

  return (
    <Box mt={5} width="100%">
      {!results ? <Spinner /> : (
        <>
          {results.length === 0 ? (
            <Text>No results found. Try another search.</Text>
          ) : (
            <>
              <Box p={5} shadow="md" borderWidth="1px">
                <Text>{results.answer}</Text>
              </Box>
              <Box pb={5} />
              <SimpleGrid columns={2} spacing={5}>
                {loading || !answers ? <Spinner /> : (
                  answers.found_references && answers.found_references.map((result, index) => (
                  <Box key={index} p={5} shadow="md" borderWidth="1px">
                    <Heading size="md">{result.reference}</Heading>
                    <Text mt={2}>{result.content}</Text>
                  </Box>
                )))}
              </SimpleGrid>
            </>
          )}
        </>
      )}
      
    </Box>
  );
}

export default SearchResults;
