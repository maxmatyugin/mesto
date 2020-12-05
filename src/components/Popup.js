export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }

  setEventListeners() {
    const closeButton = this.popupSelector.querySelector(".popup__close-icon");
    closeButton.addEventListener("click", this.close);
  }

  open() {
    this._closePopupByOverlay();
    document.addEventListener("keydown", this._handleEscClose);
    this.popupSelector.classList.add("popup_opened");
  }
  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    const closeButton = this.popupSelector.querySelector(".popup__close-icon");
    closeButton.removeEventListener("click", this.close);
    this.popupSelector.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closePopupByOverlay() {
    this.popupSelector.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.target);
      }
    });
  }
}
