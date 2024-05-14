import '../styles/global.css';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalProvider } from '../context';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// See https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(
  faGithub
);

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalProvider>
  )
}
