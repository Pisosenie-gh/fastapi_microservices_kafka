import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ProfilePage from './components/Profile';
import BasePage from './components/Base';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<BasePage />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;