function decodeURIComponentPlus(value) {
  return decodeURIComponent(value).replace(/\+/g, ' ');
}