function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}