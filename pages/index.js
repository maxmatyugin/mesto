const initialCards = [
  {
    name: 'Сиэтл',
    link: 'https://images.unsplash.com/photo-1516901632977-d141a38d469b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Джексон',
    link: 'https://images.unsplash.com/photo-1584665064866-167dba6f8a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Питтсбург',
    link: 'https://images.unsplash.com/photo-1568049896209-05cd962a9f76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
  },
  {
    name: 'Солт-Лейк-Сити',
    link: 'https://images.unsplash.com/photo-1463608666382-cbb244a7bea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80'
  },
  {
    name: 'Остин',
    link: 'https://images.unsplash.com/photo-1588993608283-7f0eda4438be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Бостон',
    link: 'https://images.unsplash.com/photo-1556079337-a837a2d11f04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80'
  }
];

let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileAddButton = profile.querySelector('.profile__add-button');
let closePopup = popup.querySelector('.popup__close-icon');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');
let popupName = popup.querySelector('.popup__input-text_type_name');
let popupCaption = popup.querySelector('.popup__input-text_type_job');
let popupAddCard = document.querySelector('.popup_type_addCard');
let addCardName = popupAddCard.querySelector('.popup__input-text_type_place');
let addCardLink = popupAddCard.querySelector('.popup__input-text_type_link');
let closeCardPopup = popupAddCard.querySelector('.popup__close-icon');
let popupAddCardButton = popupAddCard.querySelector('.popup__button');
let cardsContainer = document.querySelector('.elements__list');
let cardDeleteButton = document.querySelector('.element__delete-button');
let imagePopup = document.querySelector('.popup_type_image');
let imagePicture = imagePopup.querySelector('.popup__image');
let imageCaption = imagePopup.querySelector('.popup__caption')
let imageCloseButton = imagePopup.querySelector('.popup__close-icon');
let cardTemplate = document.querySelector('.element-template');




const renderCards = () => {
  const items = initialCards.map(element => addCard(element.name, element.link));
  cardsContainer.append(...items);

}

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    popupCaption.value = profileCaption.textContent;
    popupName.value = profileName.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function toggleCard() {
  popupAddCard.classList.toggle('popup_opened');
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileCaption.textContent = popupCaption.value;
  togglePopup();
}

function formSubmitPlace(evt) {
  evt.preventDefault();
  let item = addCard(addCardName.value, addCardLink.value);
  cardsContainer.prepend(item);
  addCardName.value = '';
  addCardLink.value = '';
  toggleCard();
}

function closeImage() {
  imagePopup.classList.toggle('popup_opened');
  imagePicture.src = '#';
  imageCaption.textContent = '';
}

function addCard(cardName, cardLink) {
  let cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.element__heading').textContent = cardName;
  cardElement.querySelector('.element__image').src = cardLink;
  cardElement.querySelector('.element__image').addEventListener('click', openImage = () => {
    imagePopup.classList.toggle('popup_opened');
    imagePicture.src = cardLink;
    imageCaption.textContent = cardName;
  });

  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.element');
    listItem.remove();
  });
  return cardElement;
}


profileEditButton.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
popup.addEventListener('submit', formSubmitProfile);
profileAddButton.addEventListener('click', toggleCard);
closeCardPopup.addEventListener('click', toggleCard);
popupAddCard.addEventListener('submit', formSubmitPlace);
imageCloseButton.addEventListener('click', closeImage);

renderCards();