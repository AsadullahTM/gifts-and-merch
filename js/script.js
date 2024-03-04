

document.getElementById('open-burger').addEventListener('click', function () {
  document.getElementById('burger-modal').classList.add('burger--opened');
});

document.getElementById('close-burger').addEventListener('click', function () {
  document.getElementById('burger-modal').classList.remove('burger--opened');
});

document.getElementById('close-card-modal').addEventListener('click', function () {
  document.getElementById('card-modal').classList.remove('card-modal--opened');
  document.getElementById('card-modal-color-list').innerHTML = '';
  document.querySelector('.card-modal__table tbody').innerHTML = '';
  document.getElementById('mini-images').innerHTML = '';
  document.getElementById('table-char').classList.remove('table--closed');
  document.querySelector('.card-modal__table-name img').classList.remove('--rotate');
});


document.querySelector('.card-modal__table-name').addEventListener('click', function () {
  document.getElementById('table-char').classList.toggle('table--closed');
  document.querySelector('.card-modal__table-name img').classList.toggle('--rotate');
});


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

const basketItems = [];

const addBasketItem = (id, colorId) => {

  const itemIn = basketItems.find((el) => (id === el.id && el.colors[colorId] === el.color) ? true : false);

  if (itemIn) {
    itemIn.count += 1;
    return;
  }

  basketItems.push({
    ...setItems[id],
    color: setItems[id].colors[colorId],
    count: 1,
  });
};



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
const totalBasketSum = basket.querySelector('.basket-modal__total-price');

const openCartModal = () => {
  let totalSum = 0;
  basketList.innerHTML = '';
  basket.classList.add('basket-modal--opened');
  const dataId = openBasket.closest('.card-modal--opened').dataset.id;
  const coloridx = openBasket.closest('.card-modal--opened').dataset.colorIdx;

  addBasketItem(dataId, coloridx);

  basketItems.forEach(item => {
    const basketItemsTemp = document.querySelector('#basket-item').content.cloneNode(true);
    const basketItem1 = basketItemsTemp.querySelector('.basket-ellement');
    const itemImg = basketItem1.querySelector('.basket-ellement__main-img');
    const itemName = basketItem1.querySelector('.basket-ellement__name');
    const itemColor = basketItem1.querySelector('.basket-ellement__color-circle');
    const itemQuqtity = basketItem1.querySelector('.basket-ellement__show-quntity');
    const itemPrice = basketItem1.querySelector('.basket-ellement__price');
    const sum = (item.price * item.count);

    itemImg.src = item.images[0];
    itemName.textContent = item.name;
    itemColor.style = `background-color: ${item.color}`;
    itemQuqtity.textContent = item.count;
    itemPrice.textContent = sum + '$';
    basketList.appendChild(basketItem1);
    totalSum += sum;

    totalBasketSum.textContent = totalSum + '$';
  });

};

document.querySelectorAll(('.cards__info')).forEach(el => {
  const dataID = el.closest('.cards__item').dataset.id;
  const basketCardsBtn = el.querySelectorAll('.cards__buy');

  basketCardsBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      addBasketItem(dataID, el.closest('.cards__item').dataset.colorIdx);
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

document.querySelectorAll('.questions__block').forEach(item => {
  item.addEventListener('click', function () {
    item.closest('.questions__item').classList.toggle('questions__item--opened');
  });
});
