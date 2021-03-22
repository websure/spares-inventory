import React, { useContext } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/test-utils';
import Part from '../Part';

describe('Testing Part List page', () => {
  test('if Parts Table is rendered', async () => {
    render(<Part />);
    const partIdCol = await screen.getByText('Part ID');
    const partNameCol = screen.getByText('Part Name');
    const partStatusCol = screen.getByText('Part Status');
    expect(partIdCol).toBeInTheDocument();
    expect(partNameCol).toBeInTheDocument();
    expect(partStatusCol).toBeInTheDocument();
  });
});
