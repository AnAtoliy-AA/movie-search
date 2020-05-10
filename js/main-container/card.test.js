import Card from './card.js';

describe('card class functionality', () => {
  const mockCardConfig = {
    Title: 'Title  1',
    Year: '2020',
    imdbID: 'test_imdbID',
    Type: 'test_type',
    Poster: 'test_poster',
  };
  let card;

  beforeEach(() => {
    card = new Card(mockCardConfig);
  });

  describe('card class constructor', () => {
    test('card constructor ', () => {
      expect(card.title).toBe(mockCardConfig.Title);
      expect(card.year).toBe(mockCardConfig.Year);
      expect(card.imdbID).toBe(mockCardConfig.imdbID);
      expect(card.type).toBe(mockCardConfig.Type);
      expect(card.poster).toBe(mockCardConfig.Poster);
    });
  });


  describe('updateDetails method', () => {
    test('updateDetails set  imdbRating', () => {
      const mockDetails = {
        imdbRating: 9.0,
      };
      card.updateDetails(mockDetails);
      expect(card.imdbRating).toBe(mockDetails.imdbRating);
    });
  });
});
