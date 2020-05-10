function createSearchForm() {
  const searchForm = document.createElement('form');
  const inputContainer = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchLoaderSpiner = document.createElement('div');
  const virtualKeyboardImg = document.createElement('div');
  const searchButton = document.createElement('button');

  searchForm.id = 'search-form';
  searchForm.classList.add('wrapper', 'form-inline', 'my-2', 'my-lg-0');
  inputContainer.classList.add('input');
  searchInput.id = 'search-text';
  searchInput.classList.add('form-control-lg', 'mr-sm-2');
  searchInput.type = 'search';
  searchInput.autocomplete = 'off';
  searchInput.autofocus = 'on';
  searchInput.placeholder = 'Search movie';
  searchLoaderSpiner.id = 'spiner';
  searchLoaderSpiner.classList.add('loader', 'hidden');
  virtualKeyboardImg.style.backgroundImage = 'url(./assets/keyboard.png)';
  virtualKeyboardImg.classList.add('keyboard-image');
  searchButton.type = 'submit';
  searchButton.classList.add('btn', 'btn-secondary', 'my-2', 'my-sm-0');
  searchButton.innerText = 'Search';

  inputContainer.appendChild(searchInput);
  inputContainer.appendChild(searchLoaderSpiner);
  inputContainer.appendChild(virtualKeyboardImg);
  searchForm.appendChild(inputContainer);
  searchForm.appendChild(searchButton);
  document.body.appendChild(searchForm);
}

class VirtualScreen {
  constructor() {
    createSearchForm();
    this.domScreen = document.getElementById('search-text');
  }

  addSymbolToScreen(value) {
    this.domScreen.setRangeText(value);
    this.rightArrowMove();
  }

  removeLastSymbol() {
    this.domScreen.selectionEnd -= 1;
    this.domScreen.selectionEnd += 1;
    this.domScreen.setRangeText('');
  }

  removeRightSymbol() {
    this.domScreen.selectionEnd += 1;
    this.domScreen.setRangeText('');
  }

  addSpaceToScreen() {
    this.domScreen.setRangeText('\u{0020}');
    this.rightArrowMove();
  }

  addEnterToScreen() {
    this.domScreen.setRangeText('\n');
    this.rightArrowMove();
  }

  rightArrowMove() {
    this.domScreen.selectionEnd += 1;
    this.domScreen.selectionStart = this.domScreen.selectionEnd;
  }

  leftArrowMove() {
    this.domScreen.selectionEnd -= 1;
    this.domScreen.selectionStart = this.domScreen.selectionEnd;
  }

  addTabToScreen() {
    this.domScreen.setRangeText('\u{0009}');
    this.rightArrowMove();
  }
}


export default VirtualScreen;
