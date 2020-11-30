export class UserInfo {
  constructor(name, caption) {
    this._name = document.querySelector(name);
    this._caption = document.querySelector(caption);
  }

  getUserInfo() {
    return { name: this._name.textContent, caption: this._caption.textContent };
  }

  setUserInfo(nameInput, captionInput) {
    this._name.textContent = nameInput;
    this._caption.textContent = captionInput;
  }
}
