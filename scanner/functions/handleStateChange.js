function handleStateChange() {
  document.title = 'Loading...';
  document.body.classList.add('react-loading');
  load(
    window.location.href,
    history.state && history.state.formValues,
    loadComplete
  );
}