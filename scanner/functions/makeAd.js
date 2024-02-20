function makeAd(x, y, headline, url, body) {
  const adGroup = game.add.group();

  adGfx.lineStyle(0.75, 0xa6a6a6, 1.0);
  adGfx.beginFill(0xffffff, 1);
  adGfx.drawRoundedRect(x, y, 465, 165, 9);

  const headlineText = game.add.text(x + 7, y + 7, headline, {
    font: "Arimo, sans-serif",
    fontSize: "30px",
    fontWeight: "normal",
    fill: "#2200CC",
  });
  headlineText.wordWrap = true;
  headlineText.wordWrapWidth = 450;
  adGroup.add(headlineText);

  const linkText = game.add.text(
    x + 7,
    headlineText.y + headlineText.height,
    url,
    {
      font: "Arimo, sans-serif",
      fontSize: "19px",
      fontWeight: "normal",
      fill: "#0F9D58",
    }
  );
  linkText.wordWrap = true;
  linkText.wordWrapWidth = 450;
  adGroup.add(linkText);

  const bodyText = game.add.text(x + 7, linkText.y + linkText.height, body, {
    font: "Arimo, sans-serif",
    fontSize: "19px",
    fontWeight: "normal",
    fill: "#000000",
  });
  bodyText.wordWrap = true;
  bodyText.wordWrapWidth = 450;
  adGroup.add(bodyText);

  return adGroup;
}