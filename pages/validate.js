const validationParams = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input-text_invalid",
  errorClass: "popup__error_visible",
};

function showError(formElements, input) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(validationParams.inputErrorClass);
}

function hideError(formElements, input) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  input.classList.remove(validationParams.inputErrorClass);
}

function toggleButtonState(formElements, buttonElement) {
  if (formElements.checkValidity()) {
    buttonElement.classList.remove(validationParams.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(validationParams.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

function checkInputValidity(formElements, input) {
  if (input.validity.valid) {
    hideError(formElements, input);
  } else {
    showError(formElements, input);
  }
}

function setEventListeners(formElements, buttonElement) {
  const inputElements = Array.from(
    formElements.querySelectorAll(".popup__input-text")
  );

  inputElements.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(formElements, evt.target);
      toggleButtonState(formElements, buttonElement);
    });
  });
  toggleButtonState(formElements, buttonElement);
}

function enableValidation({ formSelector, ...rest }) {
  const formElements = Array.from(document.querySelectorAll(formSelector));

  formElements.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const buttonElement = form.querySelector(".popup__button");

    setEventListeners(form, buttonElement);
    toggleButtonState(form, buttonElement);
  });
}

enableValidation(validationParams);
