const contentArray = [
  {
    urlStub: '/voyage-plans',
    pageHeading: 'Voyage Plans Dashboard',
    pageBlurb: null,
    formIntroHeading: null,
    formIntroBlurb: null,
    buttonText: 'Start now',
    buttonLink: 'save-voyage/page-1',
    buttonClass: 'govuk-button--start',
    buttonLocation: 'intro',
    reportType: 'tabs',
  },
  {
    urlStub: '/pleasure-crafts',
    pageHeading: 'Pleasure crafts',
    pageBlurb: 'You can view, edit or delete pleasure crafts that you regularly add to Pleasure Craft Voyage Plans.',
    formIntroHeading: 'Save a new pleasure craft',
    formIntroBlurb: 'Save the details of pleasure crafts that you regularly Submit Pleasure Craft Voyage Plans for.',
    buttonText: 'Save a pleasure craft',
    buttonLink: 'pleasure-crafts/save-pleasure-craft?source=pleasure-crafts',
    buttonClass: 'govuk-button--start',
    buttonLocation: 'formIntro',
    reportType: 'vessels',
    reportTitles: ['Pleasure craft name', 'Pleasure craft type', 'Usual moorings'],
  },
  {
    urlStub: '/people',
    pageHeading: 'People',
    pageBlurb: 'You can view, edit or delete people that you regularly sail with so that you can easily add them to Pleasure Craft Reports.',
    formIntroHeading: 'Save a new person',
    formIntroBlurb: 'Save the details of people that you regularly sail with.',
    buttonText: 'Save a person',
    buttonLink: 'people/save-person?source=people',
    buttonClass: 'govuk-button--start',
    buttonLocation: 'formIntro',
    reportType: 'people',
    reportTitles: ['Last Name', 'First Name', 'Type'],
  },
  {
    urlStub: '/account',
    pageHeading: 'Account',
    pageBlurb: 'Manage your account details',
    buttonText: 'Edit details',
    buttonLink: '/account/edit',
    buttonLocation: 'intro',
  },
];

export default contentArray;
