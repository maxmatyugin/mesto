export const initialCards = [
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

export const validationParams = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input-text_invalid",
};

export const popup = document.querySelector(".popup");
export const profileForm = popup.querySelector(
  ".popup__container_type_profile"
);
export const profile = document.querySelector(".profile");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddButton = profile.querySelector(".profile__add-button");
export const closePopupButton = popup.querySelector(".popup__close-icon");
export const profileName = profile.querySelector(".profile__name");
export const profileCaption = profile.querySelector(".profile__caption");
export const popupName = popup.querySelector(".popup__input-text_type_name");
export const popupCaption = popup.querySelector(".popup__input-text_type_job");
export const popupAddCard = document.querySelector(".popup_type_addCard");
export const addCardForm = popupAddCard.querySelector(
  ".popup__container_type_addCard"
);
export const addCardName = popupAddCard.querySelector(
  ".popup__input-text_type_place"
);
export const addCardLink = popupAddCard.querySelector(
  ".popup__input-text_type_link"
);
export const closeCardPopup = popupAddCard.querySelector(".popup__close-icon");
export const popupAddCardButton = popupAddCard.querySelector(".popup__button");
export const cardsContainer = document.querySelector(".elements__list");
export const popupImage = document.querySelector(".popup_type_image");
export const closeImageButton = popupImage.querySelector(".popup__close-icon");
export const imagePopup = document.querySelector(".popup_type_image");
export const imagePicture = imagePopup.querySelector(".popup__image");
export const imageCaption = imagePopup.querySelector(".popup__caption");