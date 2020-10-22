
function showError(formElements, input) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add("popup__input-text_invalid");
}

function hideError(formElements, input) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  input.classList.remove("popup__input-text_invalid");
}

function toggleButtonState(formElements, buttonElement) {
  if (formElements.checkValidity()) {
      buttonElement.classList.remove('popup__button_invalid');
      buttonElement.disabled = false;
  } else {
    buttonElement.classList.add('popup__button_invalid');
    buttonElement.disabled = true;
  }
}

function checkInputValidity(formElements, input) {
  
  if (input.checkValidity()) {
    hideError(formElements, input);
  } else {
    showError(formElements, input);
  }
}

function setEventListeners(formElements) {
  const inputElements = Array.from(formElements.querySelectorAll('.popup__input-text'));
  const buttonElement = formElements.querySelector('.popup__button');
  inputElements.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(formElements, evt.target);
      toggleButtonState(formElements, buttonElement);
    });
  });
  toggleButtonState(formElements, buttonElement);
}

function enableValidation({formSelector}) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach(form => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}




enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
