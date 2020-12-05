export class FormValidator {
  constructor(formElement, params) {
    this._formElement = formElement;
    this._params = params;
  }

  _showError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._params.inputErrorClass);
  }

  _hideError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(this._params.inputErrorClass);
  }

  _toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
      buttonElement.classList.remove(this._params.inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._params.inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

  _checkInputValidity(formElement, input) {
    if (input.validity.valid) {
      this._hideError(formElement, input);
    } else {
      this._showError(formElement, input);
    }
  }

  resetSubmitButton(buttonElement) {
    buttonElement.classList.add("popup__button_invalid");
    buttonElement.disabled = true;
  }

  _setEventListeners(formElement, buttonElement) {
    const inputElements = Array.from(
      formElement.querySelectorAll(this._params.inputSelector)
    );

    inputElements.forEach((input) => {
      input.addEventListener("input", (evt) => {
        this._checkInputValidity(formElement, evt.target);
        this._toggleButtonState(formElement, buttonElement);
      });
    });
    this._toggleButtonState(formElement, buttonElement);
  }

  enableValidation() {
    const formElement = this._formElement;

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const buttonElement = formElement.querySelector(
      this._params.submitButtonSelector
    );

    this._setEventListeners(formElement, buttonElement);
    this._toggleButtonState(formElement, buttonElement);
  }
}
