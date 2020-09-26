let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let editProfile = profile.querySelector('.profile__edit-button');
let closePopup = popup.querySelector('.popup__close-icon');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');
let popupName = popup.querySelector('.popup__input-text_type_name');
let popupCaption = popup.querySelector('.popup__input-text_type_job');

function togglePopup() {
  if (popup.classList.contains('popup_opened') === false) {
    popupCaption.value = profileCaption.textContent;
    popupName.value = profileName.textContent;
  } 
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileCaption.textContent = popupCaption.value;
  togglePopup();
}

editProfile.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
popup.addEventListener('submit', formSubmitHandler);
