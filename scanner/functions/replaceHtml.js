function replaceHtml(el, html) {
    let oldEl = typeof el === "string" ? document.getElementById(el) : el,
      newEl = oldEl.cloneNode(false);
    newEl.innerHTML = html;
    oldEl.parentNode.replaceChild(newEl, oldEl);
    return newEl;
  }