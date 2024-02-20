function makeTextBox(x, y, copy, invert = false) {
  const textBoxGroup = game.add.group();

  allTextBoxesGroup.add(textBoxGroup);

  const gfx = game.add.graphics(0, 0);
  textBoxGroup.add(gfx);

  const bgcolor = invert ? 0x000000 : 0xffff00;
  const linecolor = invert ? 0xffff00 : 0x000000;

  gfx.lineStyle(4, linecolor, 1.0);
  gfx.beginFill(bgcolor, 1);
  gfx.drawRect(x, y, K_TEXT_BOX_SIZE, K_TEXT_BOX_SIZE);

  const textcolor = invert ? "#ffff00" : "#000000";

  textBoxGroup.copyText = game.add.text(x + 12, y + 12, copy, {
    font: "Arimo, sans-serif",
    fontSize: "45px",
    fontWeight: "bold",
    fill: textcolor,
  });
  textBoxGroup.copyText.wordWrap = true;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.copyText.wordWrapWidth = K_TEXT_BOX_SIZE - 12;
  textBoxGroup.add(textBoxGroup.copyText);

  return textBoxGroup;
}