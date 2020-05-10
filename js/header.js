class Header {
  constructor() {
    this.createHeader();
  }

  createHeader() {
    const header = document.createElement('header');
    const navBar = this.createHeaderNavBar();
    // const searchForm = this.createSearchForm();

    header.appendChild(navBar);
    // header.appendChild(searchForm);
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

  // createSearchForm() {
  //   const searchForm = document.createElement('form');
  //   const inputContainer = document.createElement('div');
  //   const searchInput = document.createElement('input');
  //   const searchLoaderSpiner = document.createElement('div');
  //   const searchButton = document.createElement('button');

  //   searchForm.id = 'search-form';
  //   searchForm.classList.add('wrapper', 'form-inline', 'my-2', 'my-lg-0');
  //   inputContainer.classList.add('input');
  //   searchInput.id = 'search-text';
  //   searchInput.classList.add('form-control-lg', 'mr-sm-2');
  //   searchInput.type = 'search';
  //   searchInput.autocomplete = 'off';
  //   searchInput.autofocus = 'on';
  //   searchInput.placeholder = 'Search movie';
  //   searchLoaderSpiner.id = 'spiner';
  //   searchLoaderSpiner.classList.add('loader', 'hidden');
  //   searchButton.type = 'submit';
  //   searchButton.classList.add('btn', 'btn-secondary', 'my-2', 'my-sm-0');
  //   searchButton.innerText = 'Search';

  //   inputContainer.appendChild(searchInput);
  //   inputContainer.appendChild(searchLoaderSpiner);
  //   searchForm.appendChild(inputContainer);
  //   searchForm.appendChild(searchButton);

  //   return searchForm;
  // }
}

export default Header;
