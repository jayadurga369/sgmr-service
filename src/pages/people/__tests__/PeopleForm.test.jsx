import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import PeopleForm from '../PeopleForm';

const renderPage = ({ source, pageNumber }) => {
  render(
    <MemoryRouter initialEntries={[{ pathname: `/page-${pageNumber}` }]}>
      <PeopleForm source={source} />
    </MemoryRouter>,
  );
};

describe('Creating and editing people', () => {
  beforeEach(() => {
    window.sessionStorage.removeItem('formData');
  });

  it('should render different titles based on where the user comes from', () => {
    const testTitle = (text) => {
      expect(screen.getByText(text).outerHTML).toEqual(`<h1 class="govuk-heading-l">${text}</h1>`);
    };

    renderPage({ pageNumber: 1, source: 'onboarding' });
    testTitle('Add details of a person you frequently sail with');

    renderPage({ pageNumber: 2, source: 'onboarding' });
    testTitle('Add details of a person you frequently sail with');

    renderPage({ pageNumber: 1, source: 'voyage' });
    testTitle('Add details of the person you are sailing with');

    renderPage({ pageNumber: 2, source: 'voyage' });
    testTitle('Add details of the person you are sailing with');

    renderPage({ pageNumber: 1, source: 'edit' });
    testTitle('Update details of the person you sail with');

    renderPage({ pageNumber: 2, source: 'edit' });
    testTitle('Update details of the person you sail with');

    renderPage({ pageNumber: 1 });
    testTitle('Add details of the person you frequently sail with');

    renderPage({ pageNumber: 2 });
    testTitle('Add details of the person you frequently sail with');
  });

  it('should render errors on save if fields on page 1 are empty', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);
  });

  it('should load next page when user clicks continue and there are no errors', async () => {
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Given name(s)'), { target: { value: 'Joe' } });
    fireEvent.change(screen.getByLabelText('Surname'), { target: { value: 'Bloggs' } });
    fireEvent.change(screen.getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '11' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '1990' } });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.getByText('Select a travel document type')).toBeInTheDocument();
  });

  it('should load previous page when user clicks back regardless of errors', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Back')));
    expect(screen.getByText('Given name(s)')).toBeInTheDocument();
  });

  it('should render errors on save if fields on page 2 are empty', async () => {
    renderPage({ pageNumber: 2 });
    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must select a document type')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a document number')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a nationality')).toHaveLength(2);
    expect(screen.queryAllByText('You must select a document expiry')).toHaveLength(2);
  });

  it('should render errors on save if document type is OTHER and other text input is null', async () => {
    renderPage({ pageNumber: 2 });
    expect(screen.queryByText('Please specify')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Another travel document'));
    expect(screen.getByLabelText('Another travel document')).toBeChecked();
    expect(screen.getByText('Please specify')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must select a document type')).toHaveLength(2);
  });

  it('should render errors on save if document expiry is YES and expiry date is null or invalid', async () => {
    renderPage({ pageNumber: 2 });
    fireEvent.click(screen.getByLabelText('No'));
    expect(screen.getByLabelText('No')).toBeChecked();
    expect(screen.queryByText('Expiry date')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Yes'));
    expect(screen.getByLabelText('Yes')).toBeChecked();
    expect(screen.getByLabelText('No')).not.toBeChecked();
    expect(screen.getByText('Expiry date')).toBeInTheDocument();

    await waitFor(() => fireEvent.click(screen.getByText('Save')));
    expect(screen.queryAllByText('You must enter an expiry date')).toHaveLength(2);
  });

  it('should clear error for a field if user interacts with that field', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Continue')));
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);

    fireEvent.change(screen.getByLabelText('Given name(s)'), { target: { value: 'J' } });
    expect(screen.queryAllByText('You must enter a given name')).toHaveLength(0);
    expect(screen.queryAllByText('You must enter a surname')).toHaveLength(2);
    expect(screen.queryAllByText('You must enter a date of birth')).toHaveLength(2);
  });

  it('should allow you to exit without saving even if required fields arent valid', async () => {
    renderPage({ pageNumber: 1 });
    await waitFor(() => fireEvent.click(screen.getByText('Exit without saving')));
    expect(screen.queryAllByText('There is a problem')).toHaveLength(0);
  });

  it('should store form data in the session for use on refresh', async () => {
    const expectedPage1FormData = '{"firstName":"Joe","lastName":"Bloggs","dateOfBirthDay":"1","dateOfBirthMonth":"11","dateOfBirthYear":"1990"}';
    // eslint-disable-next-line max-len
    const expectedPage2FormData = '{"firstName":"Joe","lastName":"Bloggs","dateOfBirthDay":"1","dateOfBirthMonth":"11","dateOfBirthYear":"1990","documentType":"Passport","documentNumber":"abc123","nationality":"","documentExpiryDate":"documentExpiryDateNo"}';
    renderPage({ pageNumber: 1 });
    fireEvent.change(screen.getByLabelText('Given name(s)'), { target: { value: 'Joe' } });
    fireEvent.change(screen.getByLabelText('Surname'), { target: { value: 'Bloggs' } });
    fireEvent.change(screen.getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Month'), { target: { value: '11' } });
    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '1990' } });
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage1FormData);

    renderPage({ pageNumber: 2 });
    fireEvent.click(screen.getByLabelText('Passport'));
    fireEvent.change(screen.getByLabelText('Travel document number'), { target: { value: 'abc123' } });
    await waitFor(() => fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Australia' } }));
    fireEvent.click(screen.getByLabelText('No'));
    expect(window.sessionStorage.getItem('formData')).toStrictEqual(expectedPage2FormData);
  });
});
