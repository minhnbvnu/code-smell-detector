function determineContainerClientRect() {
  const htmlHeight = document.querySelector("html").offsetHeight;
  const bodyHeight = document.querySelector("body").offsetHeight;
  if (htmlHeight === bodyHeight) {
    return document.body.getBoundingClientRect();
  } else if (htmlHeight < bodyHeight) {
    return document.querySelector("html").getBoundingClientRect();
  } else {
    return document.body.getBoundingClientRect();
  }
}