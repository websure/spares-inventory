import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../utils/test-utils';
import CreatePart from '../CreatePart';

describe('Testing Create Part Modal Page', () => {
  test('Test CreatePart modal is rendered', async () => {
    render(<CreatePart />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('Test in CreatePart modal on load, Save button is disabled', async () => {
    render(<CreatePart />);
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Save').hasAttribute('disabled'));
  });

  test('Test in CreatePart modal on load, Save button is enabled, when user input is given', async () => {
    render(<CreatePart />);
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Save').hasAttribute('disabled'));
    const inputEle = screen.getByPlaceholderText('Part Name');
    userEvent.type(inputEle, 'compas');

    const radioBtn = screen.getByDisplayValue('Checked In');
    userEvent.click(radioBtn);
    expect(screen.getByText('Save').hasAttribute('disabled')).toBeFalsy();
  });
});
