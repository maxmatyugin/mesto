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
  deletePopup,
  deleteSubmitButton,
  imagePicture,
  imageCaption,
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

Promise.all([     
  api.getUserInfo(),
  api.getInitialCards()
])    
.then((values)=>{   
  const [userData, initialCards] = values;
  // у нас есть все нужные данные, отрисовываем страницу
  userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    
    const renderCards = new Section(
      {
        item: initialCards,
        renderer: (item) => {
          const card = new Card(
            item,
            ".element-template",
            {
              handleCardClick: () => {
                popupWithImage.open(item.link, item.name);
              },
            },
            initialUserInfo,
            deleteSubmitButton,
            api,
            {
              deleteHandler: () => {
                const rusurePopup = new PopupWithForm({
                  popupSelector: deletePopup,
                  formSubmitter: () => {
                    card._handleDeleteButtonClick(rusurePopup);
                  },
                });
                rusurePopup.open();
                rusurePopup.setEventListeners();
              },
            }
          );

          const cardElement = card.generateCard();
          renderCards.setItem(cardElement);
        },
      },
      cardsContainer
    );
    renderCards.renderItems();
  })


.catch((err)=>{     
  console.log(err);
})

//** Загрузка информации о пользователе */

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__caption",
  ".profile__avatar"
);

const initialUserInfo = api.getUserInfo();

function renderLoading(isLoading, popupSelector) {
  const submitButton = popupSelector.querySelector(".popup__button");
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
}

//** Установка значений имени и описания */ 
const popupWithImage = new PopupWithImage(imagePopup, imagePicture, imageCaption);

const popupUserInfo = new PopupWithForm({
  popupSelector: popup,
  formSubmitter: (data) => {
    const setUserInfo = api.setUserInfo(data.popup__name, data.popup__job);
    renderLoading(true, popup);
    setUserInfo
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        popupUserInfo.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popup);

        profileValidator.resetSubmitButton(popupSubmitButton);
      });
  },
});
//** Установка аватара */ 

const popupAvatar = new PopupWithForm({
  popupSelector: avatarPopup,
  formSubmitter: (data) => {
    renderLoading(true, avatarPopup);
    const setAvatar = api.setAvatar(data.popup__link);
    setAvatar
      .then((data) => {
        userInfo.setAvatar(data.avatar);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, avatarPopup);
        avatarValidator.resetSubmitButton(avatarSubmitButton);
      });
  },
});
//** Добавление карточек на сервер */  

const cardPopup = new PopupWithForm({
  popupSelector: popupAddCard,
  formSubmitter: (data) => {
    renderLoading(true, popupAddCard);
    const newCard = api.addNewCard(data.popup__place, data.popup__link);

    newCard
      .then((data) => {
        data.name = addCardName.value;
        data.link = addCardLink.value;
        cardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false, popupAddCard);
        cardValidator.resetSubmitButton(popupAddCardButton);
      });
  },
});

const profileValidator = new FormValidator(profileForm, validationParams);
profileValidator.enableValidation();

const cardValidator = new FormValidator(addCardForm, validationParams);
cardValidator.enableValidation();
const avatarValidator = new FormValidator(avatarForm, validationParams);
avatarValidator.enableValidation();

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
  avatarInputUrl.value = "";
  popupAvatar.open();
});

popupWithImage.setEventListeners();
popupUserInfo.setEventListeners();
popupAvatar.setEventListeners();
cardPopup.setEventListeners();


