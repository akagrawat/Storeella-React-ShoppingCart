import React from 'react';

import { default as Directory } from '../../components/directory/directory.container';

import { HomePageContainer } from './hompage.styles'

const HomePage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
}

export default HomePage;
