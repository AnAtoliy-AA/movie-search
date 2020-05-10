class Card {
  constructor(

    {
      Title, Year, imdbID, Type, Poster,
    },

  ) {
    this.title = Title;
    this.year = Year;
    this.imdbID = imdbID;
    this.type = Type;
    this.poster = Poster;
    this.imdbRating = null;
  }

  createDOMCard() {
    const cardItem = document.createElement('div');
    const imdbFilmUrl = `https://www.imdb.com/title/${this.imdbID}/`;
    const cardImage = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardTitleLink = document.createElement('a');
    const cardYear = document.createElement('p');
    const cardImdbRating = document.createElement('p');

    cardImdbRating.innerHTML = `&#9733;  ${this.imdbRating}`;
    cardTitleLink.innerText = this.title;
    cardTitleLink.href = imdbFilmUrl;
    cardTitle.classList.add('card-title');
    cardYear.innerText = `Year: ${this.year}`;
    cardImage.classList.add('card-image');
    cardItem.classList.add('swiper-slide');

    this.getCardImgUrl(cardImage);

    cardTitle.appendChild(cardTitleLink);
    cardItem.appendChild(cardTitle);
    cardItem.appendChild(cardImage);
    cardItem.appendChild(cardYear);
    cardItem.appendChild(cardImdbRating);

    return cardItem;
  }

  updateDetails(details) {
    if (details) {
      this.imdbRating = details.imdbRating;
    }
  }

  getCardImgUrl(cardImage) {
    const cardImgUrl = `url(${this.poster})`;
    const imageBadUrl = 'url(./assets/no-img-available.png)';

    cardImage.style.backgroundImage = (cardImgUrl === 'url(N/A)')
      ? imageBadUrl : `${cardImgUrl}, ${imageBadUrl}`;
  }
}

export default Card;
