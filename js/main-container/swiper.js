
function createDomSwiper() {
  const mainContainer = document.getElementById('main-container');
  const swiperContainer = document.createElement('div');
  const swiperWrapper = document.createElement('div');
  const swiperPagination = document.createElement('div');
  const swiperButtonPrevious = document.createElement('div');
  const swiperButtonNext = document.createElement('div');
  const swiperScrollbar = document.createElement('div');

  swiperContainer.classList.add('swiper-container');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperPagination.classList.add('swiper-pagination');
  swiperButtonPrevious.classList.add('swiper-button-prev');
  swiperButtonNext.classList.add('swiper-button-next');
  swiperScrollbar.classList.add('swiper-scrollbar');

  swiperContainer.appendChild(swiperWrapper);
  swiperContainer.appendChild(swiperPagination);
  swiperContainer.appendChild(swiperButtonPrevious);
  swiperContainer.appendChild(swiperButtonNext);
  swiperContainer.appendChild(swiperScrollbar);

  mainContainer.appendChild(swiperContainer);
}

function initializeSwiper() {
  createDomSwiper();

  const mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    // loop: true,
    initialSlide: 1,
    preloadImages: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    slidesPerView: 4,
    spaceBetween: 0,
    breakpoints: {
      250: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1079: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });

  return mySwiper;
}

export default initializeSwiper;
