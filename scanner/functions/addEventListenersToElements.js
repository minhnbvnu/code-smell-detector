function addEventListenersToElements(elements, event, listener) {
  elements.forEach((el) => el.addEventListener(event, listener));
}