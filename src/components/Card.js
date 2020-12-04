import { PopupWithForm } from "./PopupWithForm";
import { deletePopup, deleteSubmitButton } from "../utils/constants.js";
import { api } from "../pages/index.js";

export class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._image = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner.name;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    const userName = document.querySelector(".profile__name");

    if (!(userName.textContent === this._owner)) {
      this._element
        .querySelector(".element__delete-button")
        .classList.add("element__delete-button_hidden");
    }
    const isOwner = this._likes.filter((item) => {
      if (item.name === userName.textContent) {
        this._element
          .querySelector(".element__like-button")
          .classList.add("element__like-button_active");
      }
    });
    this._element.querySelector(
      ".element__like-counter"
    ).textContent = this._likes.length;

    return this._element;
  }

  _handleLikeButtonClick() {
    const likeCouner = this._element.querySelector(".element__like-counter");

    if (
      this._element
        .querySelector(".element__like-button")
        .classList.contains("element__like-button_active")
    ) {
      this._element
        .querySelector(".element__like-button")
        .classList.remove("element__like-button_active");
      const deleteLike = api.deleteLike(this._id);
      deleteLike.then((data) => (likeCouner.textContent = data.likes.length));
    } else {
      this._element
        .querySelector(".element__like-button")
        .classList.add("element__like-button_active");
      const addLike = api.addLike(this._id);
      addLike.then((data) => (likeCouner.textContent = data.likes.length));
    }
  }

  _handleDeleteButtonClick(rusurePopup) {
    deleteSubmitButton.textContent = "Сохранение...";
    const deleteCard = api.deleteCard(this._id);
    deleteCard
      .then(() => {})
      .catch((err) => console.log(err))
      .finally(() => {
        deleteSubmitButton.textContent = "Да";
        rusurePopup.close();
        deleteSubmitButton.classList.add("popup__button_invalid");
        deleteSubmitButton.disabled = true;
      });
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
        const rusurePopup = new PopupWithForm({
          popupSelector: deletePopup,
          formSubmitter: () => {
            this._handleDeleteButtonClick(rusurePopup);
          },
        });
        rusurePopup.open();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this.handleCardClick();
      });
  }
}
