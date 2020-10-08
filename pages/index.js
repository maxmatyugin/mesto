let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let editProfile = profile.querySelector('.profile__edit-button');
let addCardButton = profile.querySelector('.profile__add-button');
let closePopup = popup.querySelector('.popup__close-icon');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');
let popupName = popup.querySelector('.popup__input-text_type_name');
let popupCaption = popup.querySelector('.popup__input-text_type_job');
let popupAddCard = document.querySelector('.popup_type_addCard');
let closeCardPopup = popupAddCard.querySelector('.popup__close-icon');
let popupAddCardButton = popupAddCard.querySelector('.popup__button');
let cardsContainer = document.querySelector('.elements__list');
let cardDeleteButton = document.querySelector('.element__delete-button');
console.log(cardDeleteButton)



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

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileCaption.textContent = popupCaption.value;
  togglePopup();
}

function addCard(cardName, cardLink) {
  cardTemplate = document.querySelector('.element-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__heading').textContent = cardName;
  cardElement.querySelector('.element__image').src = cardLink;
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
       const listItem = evt.target.closest('.element');
       listItem.remove();
     }); 
  cardsContainer.prepend(cardElement);
}


editProfile.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
popup.addEventListener('submit', formSubmitHandler);
addCardButton.addEventListener('click', toggleCard);
closeCardPopup.addEventListener('click', toggleCard);
popupAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = popupAddCard.querySelector('.popup__input-text_type_name');
  const link = popupAddCard.querySelector('.popup__input-text_type_link');
  addCard(name.value, link.value);
  name.value = '';
  link.value = '';
  toggleCard();
});

