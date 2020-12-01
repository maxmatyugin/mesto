import { Popup } from "./Popup.js";
import { imagePicture, imageCaption } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, caption) {
    imagePicture.src = image;
    imageCaption.textContent = caption;
    super.open();
  }
}
