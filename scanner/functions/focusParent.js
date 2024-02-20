function focusParent() {
  try {
    window.open('', 'parent');
  } catch (err) {
    console.log('err', err);
  }
}