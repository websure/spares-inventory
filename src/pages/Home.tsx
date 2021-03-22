import React from 'react';
import { Grid } from 'semantic-ui-react';
import Part from '../components/Part';
import Header from '../components/Header';
import ErrorBoundary, { ERROR_TYPES } from '../components/common/ErrorBoundary';

const Home: React.FC = () => {
  return (
    <Grid padded data-id="homePage">
      <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
        <Header />
      </ErrorBoundary>
      <Grid.Row>
        <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
          <Part />
        </ErrorBoundary>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
