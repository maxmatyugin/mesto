import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  validationParams,
  popup,
  profileForm,
  profileEditButton,
  profileAddButton,
  popupName,
  popupCaption,
  popupAddCard,
  addCardForm,
  addCardName,
  addCardLink,
  popupAddCardButton,
  cardsContainer,
  imagePopup,
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';

const cardPopup = new PopupWithForm({
  popupSelector: popupAddCard,
  formSubmitter: () => {
    cardPopup.setEventListeners();
    const card = {};
    card.name = addCardName.value;
    card.link = addCardLink.value;
    const item = new Card(card, ".element-template", {
      handleCardClick: () => {
        popupWithImage.open(card.link, card.name);
      },
    });
    const cardElement = item.generateCard();
    cardsContainer.prepend(cardElement);
    addCardForm.reset();
  },
});
const userInfo = new UserInfo(".profile__name", ".profile__caption");

const popupUserInfo = new PopupWithForm({
  popupSelector: popup,
  formSubmitter: () => {
    userInfo.setUserInfo(popupName.value, popupCaption.value);
  },
});

export const popupWithImage = new PopupWithImage(imagePopup);

function validateForms() {
  const profileValidator = new FormValidator(profileForm, validationParams);
  profileValidator.enableValidation(profileForm);

  const cardValidator = new FormValidator(addCardForm, validationParams);
  cardValidator.enableValidation(addCardForm);
}

const renderCards = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".element-template", {
        handleCardClick: () => {
          popupWithImage.open(item.link, item.name);
        },
      });

      const cardElement = card.generateCard();
      renderCards.setItem(cardElement);
    },
  },
  cardsContainer
);

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  popupName.value = profileInfo.name;
  popupCaption.value = profileInfo.caption;
  popupUserInfo.open();
});

profileAddButton.addEventListener("click", () => {
  popupAddCardButton.classList.add("popup__button_invalid");
  popupAddCardButton.disabled = true;
  cardPopup.open();
});

renderCards.renderItems();
validateForms();
