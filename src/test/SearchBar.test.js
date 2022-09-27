import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing SearchBar Component', () => {
  global.alert = jest.fn();
  it('Should render all elements in SearchBar correctly', async () => {
    render(<App />);

    const btnSubmit = screen.getByText(/login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(btnSubmit).toBeDisabled();

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    const ingredientInput = screen.getByText(/ingredient/i);
    const nameInput = screen.getByText(/name/i);
    const letterInput = screen.getByText(/first letter/i);
    const searchBtn = screen.getByTestId('exec-search-btn');

    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(letterInput).toBeInTheDocument();

    userEvent.type(searchBar, 'bread');
    userEvent.click(ingredientInput);
    expect(document
      .querySelector('input[name="radioOption"]:checked').value).toBe('ingredientSearch');
    userEvent.click(searchBtn);

    expect(await screen.findByText('Nome: Bread and Butter Pudding')).toBeInTheDocument();

    userEvent.type(searchBar, 'aa');
    userEvent.click(letterInput);
    userEvent.click(searchBtn);

    global.alert.mockClear();
  });

  it('Should render all elements in SearchBar correctly', async () => {
    render(<App />);

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    const letterInput = screen.getByText(/first letter/i);
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchBar, 'a');
    userEvent.click(letterInput);
    userEvent.click(searchBtn);
    expect(await screen.findByText('Nome: Apple Frangipan Tart')).toBeInTheDocument();
  });
});
