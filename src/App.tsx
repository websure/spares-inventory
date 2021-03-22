import React from 'react';
import ErrorBoundary, { ERROR_TYPES } from './components/common/ErrorBoundary';
import StoreProvider from './store/ContextManagement';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorBoundary type={ERROR_TYPES.DEFAULT}>
        <StoreProvider>
          <Routes />
        </StoreProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
