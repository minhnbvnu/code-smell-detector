function textLayerClick(e) {
    if (
      !e.target.dataset.fontName ||
      e.target.tagName.toUpperCase() !== "SPAN"
    ) {
      return;
    }
    var fontName = e.target.dataset.fontName;
    var selects = document.getElementsByTagName("input");
    for (var i = 0; i < selects.length; ++i) {
      var select = selects[i];
      if (select.dataset.fontName !== fontName) {
        continue;
      }
      select.checked = !select.checked;
      selectFont(fontName, select.checked);
      select.scrollIntoView();
    }
  }