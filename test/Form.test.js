import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../src/client/components/Form.jsx';

describe('Form component', () => {

  it('should call onSubmit prop on form submit', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<Form onSubmit={handleSubmit} />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
})









