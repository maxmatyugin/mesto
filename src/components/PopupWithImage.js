import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, imagePicture, imageCaption) {
    super(popupSelector);
    this._imagePicture = imagePicture;
    this._imageCaption = imageCaption;
  }

  open(image, caption) {
    this._imagePicture.src = image;
    this._imagePicture.alt = `На картинке -  ${caption}`;
    this._imageCaption.textContent = caption;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
