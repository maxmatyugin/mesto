import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  validationParams,
  popup,
  profileForm,
  profile,
  profileEditButton,
  profileAddButton,
  closePopupButton,
  profileName,
  profileCaption,
  popupName,
  popupCaption,
  popupAddCard,
  addCardForm,
  addCardName,
  addCardLink,
  closeCardPopup,
  popupAddCardButton,
  cardsContainer,
  popupImage,
  closeImageButton,
  imagePicture,
  imageCaption,
} from "../utils/constants.js";

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
