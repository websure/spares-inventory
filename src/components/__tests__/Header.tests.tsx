import React from 'react';
import { render, screen } from '../../utils/test-utils';
import Header from '../Header';

describe('Testing Header Page', () => {
  test('if Add parts button is rendered', async () => {
    render(<Header />);
    const Ele = await screen.findByRole('button', { name: /Add Parts/i });
    expect(Ele).toBeInTheDocument();
  });

  test('if Title is rendered', async () => {
    render(<Header />);
    const Ele = await screen.getByText('Welcome to Spares Inventory');
    expect(Ele).toBeInTheDocument();
  });
});
