function saveState () {
  LocalStore.save(STORAGE_ID, {
    font: state.font,
  });
}