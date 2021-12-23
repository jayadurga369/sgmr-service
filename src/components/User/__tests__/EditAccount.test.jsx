import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import EditAccount from '../EditAccount';
import UserContext from '../../UserContext';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    {
      wrapper: BrowserRouter,
      ...renderOptions,
    },
  );
};

const providerProps = {
  user: {
    dateCreated: '2020-10-05T09:39:21.824679',
    email: 'John_Doe@test.com',
    firstName: 'John',
    id: '44acf985-1982-49aa-ac3b-15d365de163a',
    lastName: 'Doe',
    lastUpdated: '2020-10-08T09:55:35.504039',
    mobileNumber: '07444112888',
    people: [],
    role: { name: 'User', id: '2a960d7a-6bca-4453-8f5c-acbb8b0f9403' },
    state: 'verified',
    vessels: [],
  },
};

test('Edit Account prepopulates the form with the users details', () => {
  customRender(<EditAccount />, { providerProps });

  expect(screen.getByText('First name')).toBeInTheDocument();
  expect(screen.getByDisplayValue('John')).toBeInTheDocument();
  expect(screen.getByDisplayValue('07444112888')).toBeInTheDocument();

  describe('Save changes button displayed', () => {
    expect(screen.getByRole('button')).toHaveTextContent('Save changes');
  });
});
