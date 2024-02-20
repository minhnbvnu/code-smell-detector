function csharpify (inputString) {
  if (typeof inputString !== 'string') {
    return '';
  }

  inputString = inputString.toLowerCase();

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}