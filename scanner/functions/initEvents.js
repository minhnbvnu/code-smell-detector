function initEvents() {
  document.body.addEventListener('click', handleClick, false);
  document.body.addEventListener('submit', handleSubmit, false);
  window.addEventListener('popstate', handleStateChange, false);
}