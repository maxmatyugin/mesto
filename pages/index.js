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

const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const popupButton = popup.querySelector('.popup__button');
const closePopupButton = popup.querySelector(".popup__close-icon");
const profileName = profile.querySelector(".profile__name");
const profileCaption = profile.querySelector(".profile__caption");
const popupName = popup.querySelector(".popup__input-text_type_name");
const popupCaption = popup.querySelector(".popup__input-text_type_job");
const popupAddCard = document.querySelector(".popup_type_addCard");
const addCardName = popupAddCard.querySelector(".popup__input-text_type_place");
const addCardLink = popupAddCard.querySelector(".popup__input-text_type_link");
const closeCardPopup = popupAddCard.querySelector(".popup__close-icon");
const popupAddCardButton = popupAddCard.querySelector(".popup__button");
const cardsContainer = document.querySelector(".elements__list");
const cardDeleteButton = document.querySelector(".element__delete-button");
const imagePopup = document.querySelector(".popup_type_image");
const imagePicture = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__caption");
const imageCloseButton = imagePopup.querySelector(".popup__close-icon");
const cardTemplate = document.querySelector(".element-template");

const renderCards = () => {
  const items = initialCards.map((element) =>
    addCard(element.name, element.link)
  );
  cardsContainer.append(...items);
};

function closePopupByPressingOnOverlayAndEscape() {
  const formElements = Array.from(document.querySelectorAll(".popup"));
  formElements.forEach((form) => {
    form.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        evt.target.classList.remove("popup_opened");
      }
    });
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        
        form.classList.remove("popup_opened");
        document.removeEventListener("keydown", closeByEscape);
      }
    }
    document.addEventListener("keydown", closeByEscape);
  });
}

function openPopup() {

  popupCaption.value = profileCaption.textContent;
  popupName.value = profileName.textContent;
  popup.classList.add("popup_opened");
  closePopupByPressingOnOverlayAndEscape();
  popupButton.classList.remove("popup__button_invalid")
  
}

function closePopup() {
  popup.classList.remove("popup_opened");

  popupCaption.value = "";
  popupName.value = "";
}

function openCard() {
  popupAddCard.classList.add("popup_opened");
  closePopupByPressingOnOverlayAndEscape();
  popupAddCardButton.classList.add("popup__button_invalid");
}
function closeCard() {
  popupAddCard.classList.remove("popup_opened");
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileCaption.textContent = popupCaption.value;
  closePopup();
}

function formSubmitPlace(evt) {
  evt.preventDefault();
  const item = addCard(addCardName.value, addCardLink.value);
  cardsContainer.prepend(item);
  addCardName.value = "";
  addCardLink.value = "";
  closeCard();
}

function closeImage() {
  imagePopup.classList.toggle("popup_opened");
  imagePicture.src = "#";
  imageCaption.textContent = "";
}

function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(".element__heading").textContent = cardName;
  cardElement.querySelector(".element__image").src = cardLink;
  cardElement.querySelector(".element__image").addEventListener(
    "click",
    (openImage = () => {
      imagePopup.classList.toggle("popup_opened");
      imagePicture.src = cardLink;
      imageCaption.textContent = cardName;
      closePopupByPressingOnOverlayAndEscape();
    })
  );

  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    });
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", function (evt) {
      const listItem = evt.target.closest(".element");
      listItem.remove();
    });
  return cardElement;
}

profileEditButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
popup.addEventListener("submit", formSubmitProfile);
profileAddButton.addEventListener("click", openCard);
closeCardPopup.addEventListener("click", closeCard);
popupAddCard.addEventListener("submit", formSubmitPlace);
imageCloseButton.addEventListener("click", closeImage);

renderCards();
