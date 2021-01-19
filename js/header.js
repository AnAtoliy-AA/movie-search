class Header {
  constructor() {
    this.createHeader();
  }

  createHeader() {
    const header = document.createElement('header');
    const navBar = this.createHeaderNavBar();

    header.appendChild(navBar);
    document.body.appendChild(header);
  }

  createHeaderNavBar() {
    const navBar = document.createElement('nav');
    const navLink = document.createElement('a');
    const titleApp = document.createElement('h1');

    navBar.classList.add('wrapper', 'navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark');
    navLink.classList.add('navbar-brand');
    navLink.href = '#';
    titleApp.innerText = 'Movie search';
    navLink.appendChild(titleApp);
    navBar.appendChild(navLink);

    return navBar;
  }

}

export default Header;
