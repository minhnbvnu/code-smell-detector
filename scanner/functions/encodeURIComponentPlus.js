function encodeURIComponentPlus(value) {
  return encodeURIComponent(value).replace(/%20/g, '+');
}