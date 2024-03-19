
const burgerModal = document.querySelector('#burger');
const burgerTogles = document.querySelectorAll('.burgerToggle');

burgerTogles.forEach(el => {
  el.addEventListener('click', function () {
    burgerModal.classList.toggle('burger--opened');
  }
  );
});



const questionsBlocks = document.querySelectorAll('.questions__block');

const addQuestionItemsToggle = () => {

  questionsBlocks.forEach(el => {
    const questionItem = el.closest('.questions__item');

    el.addEventListener('click', () => {
      questionItem.classList.toggle('questions__item--opened');
    });
  });
};

if (questionsBlocks.length > 0) {
  addQuestionItemsToggle();
}



const setItems = [
  {
    id: '0',
    name: 'Belgian chocolate package',
    shortDescription: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque, tempora.',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta porro aliquid necessitatibus, quibusdam quam error similique deserunt accusamus eligendi perferendis doloribus harum recusandae qui sunt.',
    images: ['./images/sets/set-01-01.jpg', './images/sets/set-01-02.jpg', './images/sets/set-01-03.jpg', './images/sets/set-01-04.jpg'],
    colors: ['#000000', '#4c3a2e', '#a5826b'],
    price: 17.99,
    attributes: [
      {
        label: 'Вес',
        value: '280 грамм',
      },
      {
        label: 'Состав',
        value: 'Бельгийский с фундуком и кешью, ежедневный чёрный, кокосовая стружка',
      },
      {
        label: 'Дополнительно',
        value: 'Открытка-календарь',
      },
    ],
  },
  {
    id: '1',
    name: 'Cocoa and zephyr',
    shortDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    images: ['./images/sets/set-02-01.jpg', './images/sets/set-02-02.jpg', './images/sets/set-02-03.jpg'],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nihil exercitationem accusamus impedit ad, nostrum tenetur nemo saepe nisi quasi?',
    colors: ['#4c3a2e', '#cccccc'],
    price: 12.99,
    attributes: [
      {
        label: 'Вес',
        value: '180 грамм',
      },
      {
        label: 'Состав',
        value: 'Какао, зефир маршмэллоу, 3 кубика чёрного',
      },
      {
        label: 'Дополнительно',
        value: 'Открытка-поздравление',
      },
    ],
  },
  {
    id: '2',
    name: 'Multiple flavor samples',
    shortDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolore dolores deleniti!',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic non repellendus nihil recusandae obcaecati temporibus quam fugiat dolor, repellat aspernatur fugit saepe dignissimos corporis neque quod eius accusamus minima in.',
    images: ['./images/sets/set-04-01.jpg'],
    colors: ['#b86843', '#ac9336', '#235c91', '#587837'],
    price: 14.99,
    attributes: [
      {
        label: 'Вес',
        value: '200 грамм',
      },
      {
        label: 'Состав',
        value: '12 сортов шоколада',
      },
      {
        label: 'Дополнительно',
        value: 'Набор стикеров',
      },
    ],
  },
  {
    id: '3',
    name: 'Plan B package',
    shortDescription: 'Lorem ipsum dolor amet adipisicing.',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, eum.',
    images: ['./images/sets/set-03-01.jpg', './images/sets/set-03-02.jpg'],
    colors: ['#000000'],
    price: 9.99,
    attributes: [
      {
        label: 'Вес',
        value: '170 грамм',
      },
      {
        label: 'Состав',
        value: 'Печенье с шоколадной стружкой',
      },
      {
        label: 'Дополнительно',
        value: 'Кружка',
      },
    ],
  },
];

const setBasketItemsLS = (newBasketItems) => {
  window.localStorage.setItem('basketItems', JSON.stringify(newBasketItems));
};

const getBasketItemsLS = () => {
  const basketItemsString = window.localStorage.getItem('basketItems');
  return JSON.parse(basketItemsString) || [];
};

const basketItems = getBasketItemsLS();



const addBasketItem = (id, colorIdx) => {
  const itemIn = basketItems.find((el) => (id === el.id && el.colors[colorIdx] === el.color));

  if (itemIn) {
    itemIn.count += 1;
  }

  if (!itemIn) {
    basketItems.push({
      ...setItems[id],
      color: setItems[id].colors[colorIdx],
      count: 1,
    });
  }

  setBasketItemsLS(basketItems);
};

const sideCart = document.querySelector('.side-cart');
const sideCartSum = sideCart.querySelector('.side-cart__sum');
const sideCartCount = sideCart.querySelector('.side-cart__count');
const basketModalTotalPrice = document.querySelector('.basket-modal__total-price');

const updateTotalSum = () => {
  let sum = 0;
  let count = 0;
  basketItems.forEach(el => {
    sum += (el.count * el.price);
    count += el.count;
  });
  const sum2Fixed = parseFloat(sum.toFixed(2));
  sideCartSum.textContent = sum2Fixed + '$';
  sideCartCount.textContent = count;
  basketModalTotalPrice.textContent = sum2Fixed + '$';
};

const ShowSideCartToogle = () => {
  basketItems.length
    ? sideCart.classList.add('--active')
    : sideCart.classList.remove('--active');
  updateTotalSum();
};

ShowSideCartToogle();



const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template');

const fillItemList = () => {
  setItems.forEach((item) => {
    const cardItem1 = cardTemplate.content.cloneNode(true);
    cardItem1.querySelector('.cards__name').textContent = item.name;
    cardItem1.querySelector('.cards__overview').textContent = item.shortDescription;
    cardItem1.querySelector('.cards__price span').textContent = item.price;
    cardItem1.querySelector('.cards__item').dataset.id = `${item.id}`;
    const swiperImg = cardItem1.querySelector('.cards__slider');
    const headenSlider = cardItem1.querySelector('.slider-nav');

    const swiper = cardItem1.querySelector('.swiper-wrapper');
    item.images.forEach((el, index) => {
      if (index === 0) {
        cardItem1.querySelector('.cards__main-img').src = item.images[0];
        return;
      }

      const newImg = document.createElement('img');
      newImg.src = el;
      newImg.classList.add('cards__main-img', 'swiper-slide');
      swiper.appendChild(newImg);
    });

    const cardsTemplateColor = document.getElementById('cards-color');
    const cardsColorList = cardItem1.getElementById('cards-colors');
    item.colors.forEach((color, index) => {
      const cardColor1 = cardsTemplateColor.content.cloneNode(true).querySelector('.cards__color-item');
      cardColor1.querySelector('button').style = `background-color: ${color}`;

      if (index === 0) {
        cardColor1.classList.add('set__color-btn--active');
        cardItem1.querySelector('.cards__item').dataset.colorIdx = index;
      }

      cardColor1.dataset.colorIdx = index;
      cardsColorList.appendChild(cardColor1);
    });
    cardsList.appendChild(cardItem1);

    if (item.images.length > 1) {
      headenSlider.classList.remove('headen');
      swiperImg.classList.add('swiper');
      new Swiper(swiperImg, {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 1,
        loop: true,
        navigation: {
          nextEl: '.slider-nav__direction--next',
          prevEl: '.slider-nav__direction--prev',
        },
        pagination: {
          el: '.slider-nav__position',
          type: 'fraction',
        },
      });
    }
  });

  const colorBtns = cardsList.querySelectorAll('.cards__color-item');
  colorBtns.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();

      const btnEl = evt.currentTarget;
      btnEl.closest('.cards__item').dataset.colorIdx = btnEl.dataset.colorIdx;
      const cardColorList = btnEl.closest('.cards__color');
      const allColorsCard = cardColorList.querySelectorAll('.cards__color-item');
      allColorsCard.forEach((btn) => btn.classList.remove('set__color-btn--active'));
      btnEl.classList.add('set__color-btn--active');
    });
  });
};

if (cardTemplate && cardsList) {
  fillItemList();
}

const basket = document.querySelector('.basket-modal--headen');
const basketList = basket.querySelector('#basket-list');
const openBasket = document.querySelector('.card-modal__btn');
const basketItemsTemp = document.querySelector('#basket-item');
const cardModal = document.querySelector('#card-modal');

if (cardModal) {
  const cardModalColorsList = cardModal.querySelector('#card-modal-color-list');
  const cardModalTableName = cardModal.querySelector('.card-modal__table-name');
  const tableChars = cardModal.querySelector('#table-char');
  const tableNameArrow = cardModal.querySelector('.card-modal__table-name img');

  cardModalTableName.addEventListener('click', () => {
    tableChars.classList.toggle('table--closed');
    tableNameArrow.classList.toggle('--rotate');
  });

  const topSwiperImgModal = cardModal.querySelector('.swiper.swiperTop');
  const bottomSwiperImgModal = cardModal.querySelector('.swiper.swiperBottom');
  const setModalSliders = {
    top: null,
    bottom: null,
  };

  const addItemAndopenCartModal = () => {
    const dataId = openBasket.closest('.card-modal--opened').dataset.id;
    const coloridx = openBasket.closest('.card-modal--opened').dataset.colorIdx;
    addBasketItem(dataId, coloridx);
    ShowSideCartToogle();

    basketList.innerHTML = '';
    basket.classList.add('basket-modal--opened');
    fillBasket();
  };

  const cardModalImgs = cardModal.querySelector('.card-modal__main-img');

  const topSlideImgCng = (img) => {
    const topSwiperSlide = document.createElement('div');
    topSwiperSlide.classList.add('swiper-slide');
    const topSwiperImg = document.createElement('img');
    topSwiperImg.classList.add('card-modal__big-img');
    topSwiperImg.src = img;
    topSwiperSlide.appendChild(topSwiperImg);
    cardModalImgs.appendChild(topSwiperSlide);
  };

  const bottomSlideImgCng = (img) => {
    const bottomSwiperSlide = document.createElement('div');
    bottomSwiperSlide.classList.add('swiper-slide');
    const bottomSwiperImg = document.createElement('img');
    bottomSwiperImg.classList.add('card-modal__mini-img');
    bottomSwiperImg.src = img;
    const modalImgList = document.getElementById('mini-images');
    bottomSwiperSlide.appendChild(bottomSwiperImg);
    modalImgList.appendChild(bottomSwiperSlide);
  };

  document.querySelectorAll(('.cards__info')).forEach(el => {
    const dataID = el.closest('.cards__item').dataset.id;
    const basketCardBtn = el.querySelector('.cards__buy');
    const cardModalSliderBtns = document.querySelectorAll('.card-modal__slider');

    basketCardBtn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      addBasketItem(dataID, el.closest('.cards__item').dataset.colorIdx);
      ShowSideCartToogle();
    });

    basket.querySelector('.card-modal__btn--close').addEventListener('click', function () {
      basket.classList.remove('basket-modal--opened');
    });


    el.addEventListener('click', function () {
      cardModal.classList.add('card-modal--opened');
      cardModal.dataset.id = dataID;
      const cardsCharList = cardModal.querySelector('tbody');
      const cardsTempChar = document.querySelector
        ('#cards-modal-temp-char');
      const colorIdx = cardModal.dataset.colorIdx = el.querySelector('.set__color-btn--active').dataset.colorIdx;
      const modalColorList = cardModal.querySelector('#card-modal-color-list');
      const cardsTemplateColor = document.querySelector('#cards-color');



      cardModal.querySelector('.card-modal__name').textContent = setItems[dataID].name;
      cardModal.querySelector('.card-modal__price').textContent = `Цена $${setItems[dataID].price}`;
      cardModal.querySelector('.card-modal__bio').textContent = setItems[dataID].description;

      setItems[dataID].attributes.forEach(atr => {
        const cardsTempCharClone = cardsTempChar.content.cloneNode(true);
        const char1 = cardsTempCharClone.querySelector('tr');

        char1.querySelector('th').textContent = atr.label;
        char1.querySelector('td').textContent = atr.value;

        cardsCharList.appendChild(cardsTempCharClone);
      });

      setItems[dataID].colors.forEach((color, index) => {
        const cardColor1 = cardsTemplateColor.content.cloneNode(true).querySelector('.cards__color-item');
        cardColor1.querySelector('.cards__color-btn').style = `background-color: ${color}`;
        cardColor1.dataset.colorIdx = index;

        if (`${index}` === colorIdx) {
          cardColor1.classList.add('set__color-btn--active');
        }

        modalColorList.appendChild(cardColor1);
      });

      const images = setItems[dataID].images;
      const changeImg = () => {
        images.forEach((img, index) => {

          if (index === 0 && images.length === 1) {
            topSlideImgCng(img);
            return;
          }

          topSlideImgCng(img);
          bottomSlideImgCng(img);
        });

        if (images.length > 1) {

          setModalSliders.bottom = new Swiper(bottomSwiperImgModal, {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
          });

          setModalSliders.top = new Swiper(topSwiperImgModal, {
            speed: 400,
            spaceBetween: 20,
            slidesPerView: 1,
            loop: true,
            navigation: {
              nextEl: '.--next',
              prevEl: '.--prew',
            },
            thumbs: {
              swiper: bottomSwiperImgModal,
            },
          });

          cardModalSliderBtns.forEach(el => {
            el.classList.remove('display-none');
          });

          return;
        }

        cardModalSliderBtns.forEach(el => {
          el.classList.add('display-none');
        });

      };
      changeImg();

      const colorBtnsModal = cardModal.querySelectorAll('.cards__color-item');


      colorBtnsModal.forEach(btn => {
        btn.addEventListener('click', (evt) => {
          evt.stopPropagation();

          const btnEl = evt.currentTarget;
          const cardColorList = btnEl.closest('.cards__color');
          const allColorsCard = cardColorList.querySelectorAll('.cards__color-item');

          allColorsCard.forEach((btn) => btn.classList.remove('set__color-btn--active'));
          btnEl.classList.add('set__color-btn--active');

          cardModal.dataset.colorIdx = btnEl.dataset.colorIdx;
        });
      });

      openBasket.removeEventListener('click', addItemAndopenCartModal);
      openBasket.addEventListener('click', addItemAndopenCartModal);

    });
  });

  const tBody = cardModal.querySelector('tbody');
  const miniImages = cardModal.querySelector('#mini-images');
  const bigImages = cardModal.querySelector('#big-images');
  const cardModalClear = () => {
    cardModal.classList.toggle('card-modal--opened');
    cardModalColorsList.innerHTML = '';
    tBody.innerHTML = '';
    miniImages.innerHTML = '';
    bigImages.innerHTML = '';
    tableChars.classList.remove('table--closed');
    tableNameArrow.classList.remove('--rotate');
    setModalSliders.top?.destroy();
    setModalSliders.bottom?.destroy();
  };


  cardModal.addEventListener('click', () => {
    cardModalClear();
  });

  cardModal.querySelector('#close-card-modal').addEventListener('click', function () {
    cardModalClear();
  });

  cardModal.querySelector('.card-modal__box').addEventListener('click', evt => {
    evt.stopPropagation();
  });
}

const fillBasket = () => {
  basketItems.forEach((item) => {
    const basketItemsTempClone = basketItemsTemp.content.cloneNode(true);
    const basketItem1 = basketItemsTempClone.querySelector('.basket-ellement');
    const itemImg = basketItem1.querySelector('.basket-ellement__main-img');
    const itemName = basketItem1.querySelector('.basket-ellement__name');
    const itemColor = basketItem1.querySelector('.basket-ellement__color-circle');
    const itemQuqtity = basketItem1.querySelector('.basket-ellement__show-quntity');
    const itemPrice = basketItem1.querySelector('.basket-ellement__price');
    const itemMinus = basketItem1.querySelector('#item-minus');
    const itemPlus = basketItem1.querySelector('#item-plus');
    const itemDelete = basketItem1.querySelector('#item-delete');
    const sum = () => parseFloat((item.price * item.count).toFixed(2));

    itemImg.src = item.images[0];
    itemName.textContent = item.name;
    itemColor.style = `background-color: ${item.color}`;
    itemQuqtity.textContent = item.count;
    itemPrice.textContent = sum() + '$';
    basketItem1.dataset.id = item.id;
    basketItem1.dataset.colorIdx = item.color;
    basketList.appendChild(basketItem1);

    const deleteItemFromStorage = () => {
      const newIndex = basketItems.findIndex(el =>
      ((basketItem1.dataset.id === el.id) && (basketItem1.dataset.colorIdx === el.color)
      ));
      basketList.removeChild(basketItem1);
      basketItems.splice(newIndex, 1);
      setBasketItemsLS(basketItems);
      if (!basketItems.length) {
        basket.classList.toggle('basket-modal--opened');
        ShowSideCartToogle();
        localStorage.clear();
      }
    };

    itemMinus.addEventListener('click', () => {
      item.count--;
      itemQuqtity.textContent = item.count;
      itemPrice.textContent = sum() + '$';
      setBasketItemsLS(basketItems);
      updateTotalSum();

      if (item.count === 0) {
        deleteItemFromStorage();
      }
    });

    itemPlus.addEventListener('click', () => {
      item.count++;
      itemQuqtity.textContent = item.count;
      itemPrice.textContent = sum() + '$';
      setBasketItemsLS(basketItems);
      updateTotalSum();
    });

    itemDelete.addEventListener('click', () => {
      deleteItemFromStorage();
      updateTotalSum();
    });
  });
};

const basketBtnClose = basket.querySelector('.card-modal__btn--close');
document.querySelector('.side-cart').addEventListener('click', () => {
  basket.classList.toggle('basket-modal--opened');
  basketList.innerHTML = '';
  fillBasket();
  basketBtnClose.addEventListener('click', () => {
    basket.classList.remove('basket-modal--opened');
  }
  );
});

const addCallValidation = () => {
  const forms = document.querySelectorAll('.form__validation');
  const orderSucessModal = document.querySelector('#order-success');

  orderSucessModal.querySelector('button[type="button"]').addEventListener('click', () => {
    orderSucessModal.classList.remove('modal--opened');
  });

  forms.forEach(form => {
    const NameEl = form.querySelector('input[name="name"]');
    const emailEl = form.querySelector('input[type="email"]');
    const telEL = form.querySelector('input[type="phone"]');

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      orderSucessModal.classList.add('modal--opened');

      if (form.closest('.basket-modal--headen')) {
        localStorage.clear();
        ShowSideCartToogle();

        if (document.querySelector('#card-modal')) {
          basket.classList.remove('basket-modal--opened');
          document.querySelector('#card-modal').classList.remove('card-modal--opened');
        }
      }

      if (NameEl && telEL) {
        NameEl.value = '';
        emailEl.value = '';
      }

      telEL.value = '';
    });
  });
};

addCallValidation();


const brandsSectionBlockSwiper = document.querySelector('.brands-section__block');

if (brandsSectionBlockSwiper) {
  new Swiper(brandsSectionBlockSwiper, {
    speed: 400,
    loop: true,
    navigation: {
      nextEl: '.brands-next-btn',
      prevEl: '.brands-prev-btn',
    },
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 36,
        direction: 'vertical',
      },

      480: {
        slidesPerView: 2,
        spaceBetween: 40,
        autoplay: {
          delay: 3000,
        },
        direction: 'horizontal',
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 120,
        direction: 'horizontal',
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 120,
        direction: 'horizontal',
      },
      1500: {
        slidesPerView: 5,
        spaceBetween: 120
        ,
        direction: 'horizontal',
      },
    },
  });
}


