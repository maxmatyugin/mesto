import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import {
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
  avatar,
  avatarPopup,
  avatarForm,
  avatarInputUrl,
  popupSubmitButton,
  avatarSubmitButton,
} from "../utils/constants.js";
import { UserInfo, UserInfoWithAvatar } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18/",
  headers: {
    authorization: "bdefafd7-6c0d-43a5-8c84-faac50a6afd4",
    "Content-Type": "application/json",
  },
});

//Загрузка информации о пользователе

const userInfoWithAvatar = new UserInfoWithAvatar(
  ".profile__name",
  ".profile__caption",
  ".profile__avatar"
);
const initialUserInfo = api.getUserInfo();
initialUserInfo.then((data) => {
  userInfoWithAvatar.setUserInfo(data.name, data.about, data.avatar);
});

// загрузка карточек с сервера
export function loadCards() {
  const loadCards = api.getInitialCards();
  loadCards
    .then((data) => {
      const renderCards = new Section(
        {
          item: data,
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
      renderCards.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Установка значений имени и описания
export const popupWithImage = new PopupWithImage(imagePopup);
const userInfo = new UserInfo(".profile__name", ".profile__caption");

const popupUserInfo = new PopupWithForm({
  popupSelector: popup,
  formSubmitter: () => {
    const setUserInfo = api.setUserInfo(popupName.value, popupCaption.value);
    popupSubmitButton.textContent = "Сохранение...";
    setUserInfo
      .then((data) => {
        data.name = popupName.value;
        data.about = popupCaption.value;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupSubmitButton.textContent = "Сохранить";
        popupUserInfo.close();
        popupSubmitButton.classList.add("popup__button_invalid");
        popupSubmitButton.disabled = true;
      });
  },
});

// Установка аватара

const popupAvatar = new PopupWithForm({
  popupSelector: avatarPopup,
  formSubmitter: () => {
    avatarSubmitButton.textContent = "Сохранение...";
    const setAvatar = api.setAvatar(avatarInputUrl.value);
    setAvatar
      .then((data) => {
        data = avatarInputUrl.value;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // loadUserInfo();
        avatarSubmitButton.textContent = "Сохранить";
        popupAvatar.close();
        avatarSubmitButton.classList.add("popup__button_invalid");
        avatarSubmitButton.disabled = true;
      });
  },
});

//  Добавление карточек на сервер

const cardPopup = new PopupWithForm({
  popupSelector: popupAddCard,
  formSubmitter: () => {
    popupAddCardButton.textContent = "Сохранение...";
    const newCard = api.addNewCard(addCardName.value, addCardLink.value);

    newCard
      .then((data) => {
        data.name = addCardName.value;
        data.link = addCardLink.value;
        console.log(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCardButton.textContent = "Создать";
        cardPopup.close();
        popupAddCardButton.classList.add("popup__button_invalid");
        popupAddCardButton.disabled = true;
      });
  },
});

function validateForms() {
  const profileValidator = new FormValidator(profileForm, validationParams);
  profileValidator.enableValidation();

  const cardValidator = new FormValidator(addCardForm, validationParams);
  cardValidator.enableValidation();
  const avatarValidator = new FormValidator(avatarForm, validationParams);
  avatarValidator.enableValidation();
}

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  popupName.value = profileInfo.name;
  popupCaption.value = profileInfo.caption;
  popupUserInfo.open();
});

profileAddButton.addEventListener("click", () => {
  popupAddCardButton.classList.add("popup__button_invalid");
  popupAddCardButton.disabled = true;
  addCardName.value = "";
  addCardLink.value = "";
  cardPopup.open();
});

avatar.addEventListener("click", () => {
  popupAvatar.open();
});

validateForms();
loadCards();
