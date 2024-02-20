function WebPart_UpdatePosition() {
    var location = __wpTranslateOffset(0, 0, this.webPartElement, null, false);
    this.middleX = location.x + this.webPartElement.offsetWidth / 2;
    this.middleY = location.y + this.webPartElement.offsetHeight / 2;
}