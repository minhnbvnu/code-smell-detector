function inputScrollView(ele) {
  while(ele) {
    if (ele.classList.contains(SCROLL_CONTAINER_CSS)) {
      return ele;
    }
    ele = ele.parentElement;
  }
  return null;
}