function generateCallbackFunction() {
  return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}