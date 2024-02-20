function insertPopupItem(ed, popupItem) {
  const { preLabel, text } = popupItem;
  const cur = ed.getCursor();
  const textBeforeCursor = ed.getText(cur.line).substring(0, cur.ch);
  const backwardsTextBeforeCursor = textBeforeCursor
    .split("")
    .reverse()
    .join("");
  const backwardsPreLabel = preLabel
    .split("")
    .reverse()
    .join("");

  // If there is additional text in the preLabel vs the line, then
  // just insert the entire autocomplete text.  An example:
  // if you type 'a' and select '#about' from the autocomplete menu,
  // then the final text needs to the end up as '#about'.
  if (backwardsPreLabel.indexOf(backwardsTextBeforeCursor) === 0) {
    ed.replaceText(text, { line: cur.line, ch: 0 }, cur);
  } else {
    ed.replaceText(text.slice(preLabel.length), cur, cur);
  }
}