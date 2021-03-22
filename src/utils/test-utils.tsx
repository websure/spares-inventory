import React, { FC, ReactElement } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import StoreProvider from '../store/ContextManagement';
import CustomStore from '../../lib';

// jest.mock('../../lib');

jest.retryTimes(3);
const history = createMemoryHistory();

jest.spyOn(CustomStore, 'subscribe').mockImplementation(() => {});

const AllTheProviders: FC = ({ children }) => {
  return (
    <StoreProvider>
      <Router history={history}>{children}</Router>
    </StoreProvider>
  );
};

const customRender = (
  ui: ReactElement,
  // options?: Omit<RenderOptions, 'queries'>,
) => {
  // const RouteWrapper = <Router history={history}>{ui}</Router>;

  return render(ui, { wrapper: AllTheProviders });
};

export * from '@testing-library/react';

export { customRender as render };
