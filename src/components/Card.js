export class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick },
    userId,
    deleteSubmitButton,
    api,
    { deleteHandler }
  ) {
    this._name = data.name;
    this._image = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._deleteHandler = deleteHandler;
    this._deleteSubmitButton = deleteSubmitButton;
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
    this._element.querySelector(
      ".element__image"
    ).alt = `Изображение, на котором ${this._name}`;

    const userName = document.querySelector(".profile__name");

    this._userId
      .then((data) => {
        this._element
          .querySelector(".element__delete-button")
          .classList.add(
            data._id === this._owner
              ? "element__delete-button_visible"
              : "element__delete-button_hidden"
          );
      })
      .catch((err) => console.log(err));

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

  _countLikes(data) {
    const likeCounter = this._element.querySelector(".element__like-counter");
    likeCounter.textContent = data.likes.length;
  }

  _handleLikeButtonClick() {
    if (
      this._element
        .querySelector(".element__like-button")
        .classList.contains("element__like-button_active")
    ) {
      const deleteLike = this._api.deleteLike(this._id);
      deleteLike
        .then((data) => {
          this._countLikes(data);
          this._element
            .querySelector(".element__like-button")
            .classList.remove("element__like-button_active");
        })
        .catch((err) => console.log(err));
    } else {
      const addLike = this._api.addLike(this._id);
      addLike
        .then((data) => {
          this._countLikes(data);
          this._element
            .querySelector(".element__like-button")
            .classList.add("element__like-button_active");
        })
        .catch((err) => console.log(err));
    }
  }

  _handleDeleteButtonClick(popup) {
    this._deleteSubmitButton.textContent = "Сохранение...";
    const deleteCard = this._api.deleteCard(this._id);
    deleteCard
      .then(() => {
        this._element.remove();
        popup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this._deleteSubmitButton.textContent = "Да";
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
        this._deleteHandler();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._image);
      });
  }
}
