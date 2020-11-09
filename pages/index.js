import { Card, imageCaption, imagePicture } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
const initialCards = [
  {
    name: "Сиэтл",
    link:
      "https://images.unsplash.com/photo-1516901632977-d141a38d469b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Джексон",
    link:
      "https://images.unsplash.com/photo-1584665064866-167dba6f8a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Питтсбург",
    link:
      "https://images.unsplash.com/photo-1568049896209-05cd962a9f76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
  },
  {
    name: "Солт-Лейк-Сити",
    link:
      "https://images.unsplash.com/photo-1463608666382-cbb244a7bea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80",
  },
  {
    name: "Остин",
    link:
      "https://images.unsplash.com/photo-1588993608283-7f0eda4438be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Бостон",
    link:
      "https://images.unsplash.com/photo-1556079337-a837a2d11f04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80",
  },
];

const validationParams = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input-text_invalid",
};

const popup = document.querySelector(".popup");
const profileForm = popup.querySelector(".popup__container_type_profile");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const closePopupButton = popup.querySelector(".popup__close-icon");
const profileName = profile.querySelector(".profile__name");
const profileCaption = profile.querySelector(".profile__caption");
const popupName = popup.querySelector(".popup__input-text_type_name");
const popupCaption = popup.querySelector(".popup__input-text_type_job");
const popupAddCard = document.querySelector(".popup_type_addCard");
const addCardForm = popupAddCard.querySelector(
  ".popup__container_type_addCard"
);
const addCardName = popupAddCard.querySelector(".popup__input-text_type_place");
const addCardLink = popupAddCard.querySelector(".popup__input-text_type_link");
const closeCardPopup = popupAddCard.querySelector(".popup__close-icon");
const popupAddCardButton = popupAddCard.querySelector(".popup__button");
const cardsContainer = document.querySelector(".elements__list");
const popupImage = document.querySelector(".popup_type_image");
const closeImageButton = popupImage.querySelector(".popup__close-icon");

export function showPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  closePopupByOverlay(popupElement);
  document.addEventListener("keydown", closePopupByEscape);
}

function hidePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closePopupByEscape(evt) {
  const popupActive = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    hidePopup(popupActive);
  }
}

function closePopupByOverlay(form) {
  form.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      hidePopup(evt.target);
    }
  });
}

function openCard() {
  showPopup(popupAddCard);

  popupAddCardButton.classList.add("popup__button_invalid");
  popupAddCardButton.disabled = true;
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileCaption.textContent = popupCaption.value;
  hidePopup(popup);
}

function submitPlaceForm(evt) {
  evt.preventDefault();
  const card = {};
  card.name = addCardName.value;
  card.link = addCardLink.value;
  const item = new Card(card, ".element-template");
  const cardElement = item.generateCard();
  cardsContainer.prepend(cardElement);

  addCardForm.reset();
  hidePopup(popupAddCard);
}

function closeImage() {
  hidePopup(popupImage);
  imagePicture.src = "#";
  imageCaption.textContent = "";
}

function validateForms() {
  const profileValidator = new FormValidator(profileForm, validationParams);
  profileValidator.enableValidation(profileForm);

  const cardValidator = new FormValidator(addCardForm, validationParams);
  cardValidator.enableValidation(addCardForm);
}

function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, ".element-template");
    const cardElement = card.generateCard();
    cardsContainer.append(cardElement);
  });
}

profileEditButton.addEventListener("click", () => {
  popupCaption.value = profileCaption.textContent;
  popupName.value = profileName.textContent;
  showPopup(popup);
});
closePopupButton.addEventListener("click", () => hidePopup(popup));
popup.addEventListener("submit", submitProfileForm);
profileAddButton.addEventListener("click", openCard);
closeCardPopup.addEventListener("click", () => hidePopup(popupAddCard));
popupAddCard.addEventListener("submit", submitPlaceForm);
closeImageButton.addEventListener("click", closeImage);

renderCards();
validateForms();
