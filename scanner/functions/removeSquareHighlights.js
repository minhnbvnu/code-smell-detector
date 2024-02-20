function removeSquareHighlights() {
  boardEl.find('.' + CSS.square)
    .removeClass(CSS.highlight1 + ' ' + CSS.highlight2);
}