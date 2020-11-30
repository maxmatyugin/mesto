export class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._image = data.link;
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
        this.handleCardClick();
      });
  }
}
