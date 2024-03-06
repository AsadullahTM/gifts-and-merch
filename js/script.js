
document.getElementById('open-burger').addEventListener('click', function () {
  document.getElementById('burger-modal').classList.add('burger--opened');
});

document.getElementById('close-burger').addEventListener('click', function () {
  document.getElementById('burger-modal').classList.remove('burger--opened');
});

if (document.getElementById('close-card-modal')) {
  document.getElementById('close-card-modal').addEventListener('click', function () {
    document.getElementById('card-modal').classList.remove('card-modal--opened');
    document.getElementById('card-modal-color-list').innerHTML = '';
    document.querySelector('.card-modal__table tbody').innerHTML = '';
    document.getElementById('mini-images').innerHTML = '';
    document.getElementById('table-char').classList.remove('table--closed');
    document.querySelector('.card-modal__table-name img').classList.remove('--rotate');
  });
}

if (document.querySelector('.card-modal__table-name')) {
  document.querySelector('.card-modal__table-name').addEventListener('click', function () {
    document.getElementById('table-char').classList.toggle('table--closed');
    document.querySelector('.card-modal__table-name img').classList.toggle('--rotate');
  });
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


let basketItems = [];

const setBasketItemsLS = (newBasketItems) => {
  window.localStorage.setItem('basketItems', JSON.stringify(newBasketItems));
};

const getBasketItemsLS = () => {
  const basketItemsString = window.localStorage.getItem('basketItems');
  return JSON.parse(basketItemsString) || [];
};



getBasketItemsLS();


const addBasketItem = (id, colorId) => {
  const basketItems = getBasketItemsLS();
  const itemIn = basketItems.find((el) => (id === el.id && el.colors[colorId] === el.color) ? true : false);

  if (itemIn) {
    itemIn.count += 1;
    setBasketItemsLS(basketItems);
    return;
  }

  basketItems.push({
    ...setItems[id],
    color: setItems[id].colors[colorId],
    count: 1,
  });

  setBasketItemsLS(basketItems);
};


const totalSum = () => {
  const basketItems = getBasketItemsLS();
  let sum = 0;
  let count = 0;
  basketItems.forEach(el => {
    sum += (el.count * el.price);
    count += el.count;
  });

  document.querySelector('.side-cart__sum').textContent = sum + '$';
  document.querySelector('.side-cart__count').textContent = count;
  document.querySelector('.basket-modal__total-price').textContent = sum + '$';
};

const sideCartToogle = () => {
  const basketItems = getBasketItemsLS();
  basketItems.length ? document.querySelector('.side-cart').classList.add('--active') : document.querySelector('.side-cart').classList.remove('--active');
  totalSum();
};

sideCartToogle();

const fillItemList = () => {
  const cardsList = document.querySelector('.cards__list');
  const cardTemplate = document.getElementById('card-template');

  if (!cardTemplate && !cardsList) {
    return;
  }

  setItems.forEach((item) => {
    const cardItem1 = cardTemplate.content.cloneNode(true);

    cardItem1.querySelector('.cards__main-img').src = item.images[0];
    cardItem1.querySelector('.cards__name').textContent = item.name;
    cardItem1.querySelector('.cards__overview').textContent = item.shortDescription;
    cardItem1.querySelector('.cards__price span').textContent = item.price;
    cardItem1.querySelector('.cards__item').dataset.id = `${item.id}`;
    item.colors.forEach((color, index) => {
      const cardsColorList = cardItem1.getElementById('cards-colors');
      const cardsTemplateColor = document.getElementById('cards-color');
      const cardColor1 = cardsTemplateColor.content.cloneNode(true).querySelector('.cards__color-item');
      cardColor1.querySelector('.cards__color-item button').style = `background-color: ${color}`;

      if (index === 0) {
        cardColor1.classList.add('set__color-btn--active');
        cardItem1.querySelector('.cards__item').dataset.colorIdx = index;
      }

      cardColor1.dataset.colorIdx = index;

      cardsColorList.appendChild(cardColor1);


    });
    cardsList.appendChild(cardItem1);

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
  });
};

fillItemList();

const basket = document.querySelector('.basket-modal--headen');
const basketList = basket.querySelector('#basket-list');
const openBasket = document.querySelector('.card-modal__btn');

const fillBasket = () => {
  const basketItems = getBasketItemsLS();
  basketItems.forEach((item) => {
    const basketItemsTemp = document.querySelector('#basket-item').content.cloneNode(true);
    const basketItem1 = basketItemsTemp.querySelector('.basket-ellement');
    const itemImg = basketItem1.querySelector('.basket-ellement__main-img');
    const itemName = basketItem1.querySelector('.basket-ellement__name');
    const itemColor = basketItem1.querySelector('.basket-ellement__color-circle');
    const itemQuqtity = basketItem1.querySelector('.basket-ellement__show-quntity');
    const itemPrice = basketItem1.querySelector('.basket-ellement__price');
    const itemMinus = basketItem1.querySelector('#item-minus');
    const itemPlus = basketItem1.querySelector('#item-plus');
    const itemDelete = basketItem1.querySelector('#item-delete');
    const sum = () => item.price * item.count;

    itemImg.src = item.images[0];
    itemName.textContent = item.name;
    itemColor.style = `background-color: ${item.color}`;
    itemQuqtity.textContent = item.count;
    itemPrice.textContent = sum() + '$';
    basketItem1.dataset.id = item.id;
    basketItem1.dataset.colorIdx = item.color;
    basketList.appendChild(basketItem1);

    itemMinus.addEventListener('click', () => {
      item.count--;
      itemQuqtity.textContent = item.count;
      itemPrice.textContent = sum() + '$';
      setBasketItemsLS(basketItems);
      totalSum();

      if (item.count === 0) {
        const newIndex = basketItems.findIndex(el =>
        ((itemMinus.closest('.basket-ellement').dataset.id === el.id) && (itemMinus.closest('.basket-ellement').dataset.colorIdx === el.color)
        ));

        basketList.removeChild(basketItem1);
        basketItems.splice(newIndex, 1);
        setBasketItemsLS(basketItems);

        if (!basketItems.length) {
          basket.classList.toggle('basket-modal--opened');
          sideCartToogle();
          localStorage.clear();
        }
      }
    });

    itemPlus.addEventListener('click', () => {
      item.count++;
      itemQuqtity.textContent = item.count;
      itemPrice.textContent = sum() + '$';
      setBasketItemsLS(basketItems);
      totalSum();
    });

    itemDelete.addEventListener('click', () => {
      const newIndex = basketItems.findIndex(el =>
      ((basketItem1.dataset.id === el.id) && (basketItem1.dataset.colorIdx === el.color)
      ));
      basketList.removeChild(basketItem1);
      basketItems.splice(newIndex, 1);
      setBasketItemsLS(basketItems);
      if (!basketItems.length) {
        basket.classList.toggle('basket-modal--opened');
        sideCartToogle();
        localStorage.clear();
      }
      totalSum();
    });
  });
};

const openCartModal = () => {
  const dataId = openBasket.closest('.card-modal--opened').dataset.id;
  const coloridx = openBasket.closest('.card-modal--opened').dataset.colorIdx;
  addBasketItem(dataId, coloridx);
  sideCartToogle();

  basketList.innerHTML = '';
  basket.classList.add('basket-modal--opened');
  fillBasket();
};

document.querySelectorAll(('.cards__info')).forEach(el => {
  const dataID = el.closest('.cards__item').dataset.id;
  const basketCardsBtn = el.querySelectorAll('.cards__buy');

  basketCardsBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      addBasketItem(dataID, el.closest('.cards__item').dataset.colorIdx);
      sideCartToogle();
    });

    basket.querySelector('.card-modal__btn--close').addEventListener('click', function () {
      basket.classList.remove('basket-modal--opened');
    });
  });

  el.addEventListener('click', function () {
    const cardModal = document.getElementById('card-modal');
    cardModal.classList.add('card-modal--opened');
    cardModal.dataset.id = dataID;

    const colorIdx = cardModal.dataset.colorIdx = el.querySelector('.set__color-btn--active').dataset.colorIdx;
    const modalOpened = document.getElementById('card-modal');


    modalOpened.querySelector('.card-modal__name').textContent = setItems[dataID].name;
    modalOpened.querySelector('.card-modal__price').textContent = `Цена $${setItems[dataID].price}`;
    modalOpened.querySelector('.card-modal__bio').textContent = setItems[dataID].description;

    setItems[dataID].attributes.forEach(atr => {
      const cardsCharList = document.querySelector('tbody');
      const cardsTempChar = document.getElementById
        ('cards-modal-temp-char').content.cloneNode(true);
      const char1 = cardsTempChar.querySelector('tr');

      char1.querySelector('th').textContent = atr.label;
      char1.querySelector('td').textContent = atr.value;

      cardsCharList.appendChild(cardsTempChar);
    });

    setItems[dataID].colors.forEach((color, index) => {
      const modalColorList = document.getElementById('card-modal-color-list');
      const cardsTemplateColor = document.getElementById('cards-color');
      const cardColor1 = cardsTemplateColor.content.cloneNode(true).querySelector('.cards__color-item');
      cardColor1.querySelector('.cards__color-btn').style = `background-color: ${color}`;
      cardColor1.dataset.colorIdx = index;

      if (`${index}` === colorIdx) {
        cardColor1.classList.add('set__color-btn--active');
      }

      modalColorList.appendChild(cardColor1);
    });

    const changeImg = function () {
      const images = setItems[dataID].images;

      images.forEach((img, index) => {
        if (index === 0) {
          modalOpened.querySelector('.card-modal__big-img').src = img;
          return;
        }

        const modalImgList = document.getElementById('mini-images');
        const modalTemplateImg = document.getElementById('card-modal-mini-img');
        const modalImg1 = modalTemplateImg.content.cloneNode(true);

        modalImg1.querySelector('.card-modal__mini-img').src = img;

        modalImgList.appendChild(modalImg1);

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

    openBasket.removeEventListener('click', openCartModal);
    openBasket.addEventListener('click', openCartModal);

  });
});

document.querySelector('.side-cart').addEventListener('click', () => {
  document.querySelector('.basket-modal--headen').classList.toggle('basket-modal--opened');
  document.querySelector('#basket-list').innerHTML = '';
  fillBasket();
  basket.querySelector('.card-modal__btn--close').addEventListener('click', () => {
    basket.classList.remove('basket-modal--opened');
  }
  );
});

document.querySelectorAll('.questions__block').forEach(item => {
  item.addEventListener('click', function () {
    item.closest('.questions__item').classList.toggle('questions__item--opened');
  });
});

