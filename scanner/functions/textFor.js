function textFor(selector, context) {
  return context.querySelector(selector).textContent.trim();
}