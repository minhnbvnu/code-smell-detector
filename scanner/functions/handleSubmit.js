function handleSubmit(event) {
  var formValues = serialiseForm(event.target);
  history.pushState({ formValues: formValues }, null, event.target.action);
  handleStateChange();
  event.preventDefault();
}