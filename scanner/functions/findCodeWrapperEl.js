function findCodeWrapperEl(el) {
  if (el.classList.contains('v-md-pre-wrapper')) {
    return el;
  }

  return findCodeWrapperEl(el.parentNode);
}