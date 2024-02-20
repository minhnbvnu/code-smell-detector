function focus_contenteditable(el, end) {
  range = document.createRange();

  if (!range || !el) return;
  var p = $(el).find("p");
  if (!p.length) return;

  // get last paragraph
  p = p[p.length-1];
  
  range.selectNodeContents(p);
  
  selection = window.getSelection();
  selection.removeAllRanges();
  if (range.toString()!="Text") {
    // move cursor to the end
    range.collapse(false);
  }
  selection.addRange(range);

  el.focus();
}