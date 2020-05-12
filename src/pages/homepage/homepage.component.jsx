import React from 'react';

import { default as Directory } from '../../components/directory/directory.container';

import { HomePageContainer } from './hompage.styles'

const HomePage = () => {
  return (
    <HomePageContainer>
      <h1>{process.env.REACT_APP_CUSTOM_NODE_ENV}</h1>
      <h1>{process.env.REACT_APP_API_ENDPOINT}</h1>
      <Directory />
    </HomePageContainer>
  );
}

export default HomePage;
