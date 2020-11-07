import {closePopupByPressingOnOverlayAndEscape} from './index.js'

const imagePopup = document.querySelector(".popup_type_image");
const imagePicture = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");
const imageCloseButton = imagePopup.querySelector(".popup__close-icon");

// const cardParams ={
//   imagePopup: ".popup_type_image",
//   imagePicture: ".popup__image",
//   imageCaption: ".popup__caption",
//   imageCloseButton: ".popup__close-icon"
// }

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__heading").textContent = this._name;
    this._element.querySelector(".element__image").src = this._image;
    return this._element;
  }

  _handleLikeButtonClick() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove(this._element);
  }

  _handleImageClick() {
    console.log("open");
    imagePicture.src = this._image;
    imageCaption.textContent = this._name;
    imagePopup.classList.add("popup_opened");
    closePopupByPressingOnOverlayAndEscape();
  }

  _closeImagePopup() {
    imagePicture.src = "";
    imageCaption.textContent = "";
    imagePopup.classList.remove("popup_opened");
    console.log(event.target);
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeButtonClick();
      });

    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });

    imageCloseButton.addEventListener("click", () => {
      this._closeImagePopup();
    });
  }
}
