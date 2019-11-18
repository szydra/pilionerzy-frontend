import {AppPage} from './app.po';

describe('pilionerzy App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have proper title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Pilionerzy');
  });

  it('should have link to home page', () => {
    page.navigateTo();
    expect(page.getNavBarLink()).toMatch(/\/home$/);
  });
});
