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
export const popupName = popup.querySelector(".popup__input-text_type_name");
export const popupCaption = popup.querySelector(".popup__input-text_type_job");
export const popupSubmitButton = popup.querySelector(".popup__button");
export const popupAddCard = document.querySelector(".popup_type_add_card");
export const addCardForm = popupAddCard.querySelector(
  ".popup__container_type_add_card"
);
export const addCardName = popupAddCard.querySelector(
  ".popup__input-text_type_place"
);
export const addCardLink = popupAddCard.querySelector(
  ".popup__input-text_type_link"
);
export const popupAddCardButton = popupAddCard.querySelector(".popup__button");
export const cardsContainer = document.querySelector(".elements__list");
export const popupImage = document.querySelector(".popup_type_image");
export const imagePopup = document.querySelector(".popup_type_image");
export const imagePicture = imagePopup.querySelector(".popup__image");
export const imageCaption = imagePopup.querySelector(".popup__caption");
export const avatar = document.querySelector(".profile__avatar");
export const avatarPopup = document.querySelector(".popup_type_avatar");
export const avatarForm = document.querySelector(
  ".popup__container_type_avatar"
);
export const avatarInputUrl = avatarPopup.querySelector(".popup__input-text");
export const avatarSubmitButton = avatarPopup.querySelector(".popup__button");
export const deletePopup = document.querySelector(".popup_type_rusure");
export const deleteSubmitButton = deletePopup.querySelector(".popup__button");
