const validationParams = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  inputErrorClass: "popup__input-text_invalid"
};

function showError(formElements, input, {inputErrorClass}) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

function hideError(formElements, input, {inputErrorClass}) {
  const errorElement = formElements.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  input.classList.remove(inputErrorClass);
}

function toggleButtonState(formElements, buttonElement, {inactiveButtonClass}) {
  if (formElements.checkValidity()) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

function checkInputValidity(formElements, input, {...rest}) {
  if (input.validity.valid) {
    hideError(formElements, input, rest);
  } else {
    showError(formElements, input, rest);
  }
}

function setEventListeners(formElements, buttonElement, {inputSelector, ...rest}  ) {
  const inputElements = Array.from(
    formElements.querySelectorAll(inputSelector)
  );

  inputElements.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(formElements, evt.target, rest);
      toggleButtonState(formElements, buttonElement, rest);
    });
  });
  toggleButtonState(formElements, buttonElement, rest);
}

function enableValidation({ formSelector, submitButtonSelector, ...rest}) {
  const formElements = Array.from(document.querySelectorAll(formSelector));

  formElements.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const buttonElement = form.querySelector(submitButtonSelector);

    setEventListeners(form, buttonElement, rest);
    toggleButtonState(form, buttonElement, rest);
  });
}

enableValidation(validationParams);
