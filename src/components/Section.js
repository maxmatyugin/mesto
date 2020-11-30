export class Section {
  constructor({ item, renderer }, containerSelector) {
    this._renderedItems = item;
    this._container = containerSelector;
    this._renderer = renderer;
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(item) {
    this._container.append(item);
  }
}
