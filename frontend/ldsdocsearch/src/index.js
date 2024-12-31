import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'; // Optional: If you have a custom theme
import App from './App';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
