import Card from './card';
import initializeSwiper from './swiper';

const API_KEYS = {
  IMDB: '2a051ccf',
  YANDEX: 'trnsl.1.1.20200508T093226Z.509bbc3c7b82dcc9.e20b1eaa78b0260dcd915efcf0b967ccb668ccfd',
};

const START_PAGE = {
  WORD: 'warrior',
  NUMBER: '1',
};

function createDomCardContainer() {
  const domCardContainer = document.createElement('div');
  const messageContainer = document.createElement('div');

  domCardContainer.classList.add('main-container', 'wrapper');
  domCardContainer.style.backgroundImage = 'url(./assets/main-container-img.png)';
  domCardContainer.id = 'main-container';
  messageContainer.id = 'message-container';
  domCardContainer.appendChild(messageContainer);
  document.body.appendChild(domCardContainer);
}

class CardContainer {
  constructor() {
    this.searchWord = START_PAGE.WORD;
    this.activePageNumber = START_PAGE.NUMBER;
    this.filmCards = [];
    this.domFilmCards = [];
    createDomCardContainer();
    this.getDomCardContainer();
    // this.domCardContainer = this.getDomCardContainer();
    initializeSwiper();
    this.getDomSwiper();
    this.toggleLoaderSpinner();
    this.searchFilms();
    this.searchForm = this.getSearchForm();
    this.messageContainer = this.getMessageContainer();
    this.addSubmitListner();
    this.getNextDomFilms();
  }

  searchFilms() {
    this.getFilmTitleData(this.searchWord, this.activePageNumber);
  }

  createDomFilmCards() {
    return this.filmCards.map((el) => el.createDOMCard());
  }

  getDomSwiper() {
    this.domSwiper = document.querySelector('.swiper-container').swiper;
  }

  async getFilmTitleData(searchText, searchPageNumber) {
    const searchTextUrl = `http://www.omdbapi.com/?s=${searchText}&page=${searchPageNumber}&apikey=${API_KEYS.IMDB}`;

    const response = await fetch(searchTextUrl);
    const data = await response.json();

    this.analyzeApiResponse(data);
  }

  analyzeApiResponse(data) {
    const searchText = this.getSearchText();

    if (data.Search) {
      this.createFilmCards(data.Search);
      this.updateFilmsDetailsData(data);
    } else {
      this.toggleLoaderSpinner();
      this.messageContainer.innerText = `No results for ${searchText}`;
    }
  }

  async updateFilmsDetailsData(data) {
    const filmDetails = data.Search.map((el) => this.getfilmDetailsData(el.imdbID));
    Promise.all(filmDetails).then((filmDetailsData) => {
      filmDetailsData.forEach((element) => this.updateFilmCardDetails(element));
      this.updateDomFilmCards();
    });
    this.toggleLoaderSpinner();
  }

  updateDomFilmCards() {
    this.domFilmCards = this.createDomFilmCards();
    this.appendListOfDomCardsToSwiper(this.domFilmCards);
  }

  createFilmCards(filmCardsData) {
    this.filmCards = filmCardsData.map((el) => new Card(el));
  }

  appendListOfDomCardsToSwiper(domCards) {
    if (Array.isArray(domCards)) {
      domCards.forEach((card) => {
        this.domSwiper.appendSlide(card);
      });
    }
  }

  async getfilmDetailsData(imdbID) {
    const imdbIDUrl = `http://www.omdbapi.com/?i=${imdbID}&page=1&apikey=${API_KEYS.IMDB}`;
    const apiResponse = await fetch(imdbIDUrl);

    return apiResponse.json();
  }

  updateFilmCardDetails(details) {
    const card = this.filmCards.find((el) => el.imdbID === details.imdbID);

    if (card) {
      card.updateDetails(details);
    }
  }

  getDomCardContainer() {
    this.domCardContainer = document.getElementById('main-container');
  }


  getSearchForm() {
    return document.getElementById('search-form');
  }

  addSubmitListner() {
    this.searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitTextFromSearchForm();
    });
  }

  submitTextFromSearchForm() {
    const searchText = this.getSearchText();

    this.messageContainer.innerText = '';
    this.activePageNumber = START_PAGE.NUMBER;

    if (searchText.length > 0) {
      this.toggleLoaderSpinner();
      this.chooseLanguageOfSearchText(searchText);
    } else {
      this.messageContainer.innerText = 'Please, enter some word';
    }
  }

  getSearchText() {
    return document.getElementById('search-text').value.toString();
  }

  chooseLanguageOfSearchText(searchText) {
    const regexpRu = new RegExp('[а-я]', 'i');
    this.clearSwiperContainer();
    if (regexpRu.test(searchText)) {
      this.getTextForRusWords(searchText);
    } else {
      this.searchWord = searchText;
      this.searchFilms();
    }
  }

  async getTextForRusWords(searchText) {
    // TODO CONST
    const yandexTranslateUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEYS.YANDEX}&text=${searchText}&lang=ru-en`;

    const response = await fetch(yandexTranslateUrl);
    const data = await response.json();
    this.messageContainer.innerText = `Showing results for ${data.text}`;
    this.searchWord = data.text;
    this.searchFilms();
  }

  getMessageContainer() {
    return document.getElementById('message-container');
  }

  getLoaderSpinner() {
    return document.getElementById('spiner');
  }

  toggleLoaderSpinner() {
    const loaderSpinner = this.getLoaderSpinner();

    loaderSpinner.classList.toggle('hidden');
  }

  clearSwiperContainer() {
    this.domSwiper.removeAllSlides();
  }

  getNextDomFilms() {
    this.domSwiper.on('reachEnd', () => {
      if (this.domSwiper.activeIndex > 0) {
        this.activePageNumber++;
        this.toggleLoaderSpinner();
        this.getFilmTitleData(this.searchWord, this.activePageNumber);
      }
    });
  }
}

export default CardContainer;
