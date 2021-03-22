import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '../../utils/test-utils';
import Home from '../Home';
import App from '../../App';

describe('Testing Landing Home Page', () => {
  test('Test if Home Page is rendered', () => {
    const { container } = render(<Home />);
    const HomeWrapper = container.querySelector('[data-id="homePage"]');
    expect(HomeWrapper).toBeInTheDocument();
  });

  test('Test when route is changed, Home is rendered', async () => {
    const history = createMemoryHistory();
    const { container } = render(<App />);
    await history.go('/');
    const HomeWrapper = await container.querySelector('[data-id="homePage"]');
    expect(HomeWrapper).toBeInTheDocument();
  });
});
