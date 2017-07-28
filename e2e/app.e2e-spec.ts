import { SharedyPage } from './app.po';

describe('sharedy App', () => {
  let page: SharedyPage;

  beforeEach(() => {
    page = new SharedyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
