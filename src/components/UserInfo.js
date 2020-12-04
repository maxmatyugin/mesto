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

export class UserInfoWithAvatar extends UserInfo {
  constructor(name, caption, avatar) {
    super(name, caption);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      caption: this._caption.textContent,
      avatar: this._avatar,
    };
  }

  setUserInfo(nameInput, captionInput, avatarInput) {
    super.setUserInfo(nameInput, captionInput);
    this._avatar.style.backgroundImage = `url('${avatarInput}')`;
  }
}
