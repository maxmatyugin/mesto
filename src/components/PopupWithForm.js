import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitter }) {
    super(popupSelector);
    this._formSubmitter = formSubmitter;
    this._formSelector = this.popupSelector.querySelector(".popup__container");
  }

  _getInputValues() {
    this._inputList = this._formSelector.querySelectorAll(".popup__input-text");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitter();
    });
  }
}
