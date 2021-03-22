import React from 'react';
import { render, screen } from '../utils/test-utils';
import App from '../App';

describe('Application Base Page', () => {
  test('App is loaded in the DOM', () => {
    const { container } = render(<App />);

    const Ele = container.querySelector('.App');
    expect(Ele).toBeInTheDocument();
  });

  test('Add Parts button is available in the DOM', async () => {
    render(<App />);
    const Ele = await screen.findByRole('button', { name: /Add Parts/i });
    expect(Ele).toBeInTheDocument();
  });
});
