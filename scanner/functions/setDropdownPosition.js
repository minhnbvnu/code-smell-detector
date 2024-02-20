function setDropdownPosition(dropdown, trigger, options = {}) {
  const doc = document.documentElement;
  const containerScrollLeft =
    (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  const containerScrollTop =
    (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  const rect = trigger.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  dropdown.style.right = 'auto';
  dropdown.style.bottom = 'auto';
  if (options.menuRight) {
    const left =
      containerScrollLeft + rect.left + rect.width - dropdownRect.width;
    dropdown.style.left = left < 0 ? 0 : left + 'px';
  } else {
    dropdown.style.left = containerScrollLeft + rect.left + 'px';
  }
  if (options.dropup) {
    dropdown.style.top =
      containerScrollTop + rect.top - dropdownRect.height - 4 + 'px';
  } else {
    dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px';
  }
}