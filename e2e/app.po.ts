import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/home');
  }

  getNavBarLink() {
    return element(by.css('pil-nav-bar a')).getAttribute('href').then(link => link);
  }

  getTitle() {
    return browser.getTitle().then(title => title);
  }
}
