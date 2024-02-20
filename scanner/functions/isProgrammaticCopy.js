function isProgrammaticCopy(event) {
  return (typeof(event.target.selectionStart) !== 'undefined'
    && typeof(event.target.selectionEnd) !== 'undefined'
    && ((event.target.selectionEnd - event.target.selectionStart) > 0));
}