let popup = document.querySelector('.popup');
let popupCloseIcon = popup.querySelector('.popup__close-icon')
let popupName = popup.querySelector('.popup__name');
let popupCaption = popup.querySelector('.popup__caption');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let profileEditButton = document.querySelector('.profile__edit-button');


function togglePopup() { 
  popup.classList.toggle('popup_opened'); 
  
  popupCaption.value = profileCaption.textContent;
  popupName.value = profileName.textContent;
  
}

profileEditButton.addEventListener('click', togglePopup);
popupCloseIcon.addEventListener('click', togglePopup);


function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let popupName = document.querySelector('.popup__name');
    let popupCaption = document.querySelector('.popup__caption');

    popupName = popupName.value;
    popupCaption = popupCaption.value;

    let profileName = document.querySelector('.profile__name');
    let profileCaption = document.querySelector('.profile__caption');
    
    profileName.textContent = popupName;
    profileCaption.textContent = popupCaption;

    togglePopup();
}

popup.addEventListener('submit', formSubmitHandler);
