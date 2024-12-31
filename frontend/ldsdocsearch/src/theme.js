import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#003B5C', // Dark Blue
      800: '#006D8E', // Medium Blue
      700: '#00A4CC', // Light Blue
      600: '#B4D9E6', // Soft Blue for background
      500: '#F1F1F1', // Light Grey for lighter background elements
      400: '#F7D085', // Gold for highlights or accent
    },
  },
  fonts: {
    heading: 'Inter, sans-serif', // Modern and clean sans-serif for headings
    body: 'Roboto, sans-serif', // Clean and readable sans-serif
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md', // Rounded corners for a softer look
        fontWeight: 'bold', // Make text bold for prominence
      },
      variants: {
        solid: {
          bg: 'brand.700', // Blue background for solid buttons
          color: 'white', // White text color
          _hover: {
            bg: 'brand.800', // Darker blue on hover
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'brand.700', // Blue border for outline buttons
          color: 'brand.700', // Blue text for outline
          _hover: {
            bg: 'brand.600', // Light blue background on hover
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md', // Rounded input fields
          borderWidth: '2px',
          borderColor: 'brand.600', // Soft blue border color
          _focus: {
            borderColor: 'brand.700', // Darker blue on focus
            boxShadow: '0 0 0 1px #00A4CC', // Blue glow on focus
          },
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'brand.900', // Dark blue text for a serene feeling
      },
    },
    Link: {
      baseStyle: {
        color: 'brand.700', // Blue color for links
        textDecoration: 'underline',
        _hover: {
          color: 'brand.800', // Darker blue on hover
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.500', // Light gray background for a peaceful feel
        color: 'brand.900', // Dark text for good readability
        fontFamily: 'Roboto, sans-serif',
      },
      h1: {
        fontFamily: 'Inter, sans-serif', // Modern serif look for headings
        fontWeight: 'bold',
        color: 'brand.900',
      },
    },
  },
});

export default theme;
