export class UserInfo {
  constructor(name, caption, avatar) {
    this._name = document.querySelector(name);
    this._caption = document.querySelector(caption);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      caption: this._caption.textContent,
    };
  }

  setUserInfo(nameInput, captionInput) {
    this._name.textContent = nameInput;
    this._caption.textContent = captionInput;
  }

  setAvatar(avatarInput) {
    this._avatar.style.backgroundImage = `url('${avatarInput}')`;
  }
}
