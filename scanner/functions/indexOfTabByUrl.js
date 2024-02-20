function indexOfTabByUrl(tabArray, url) {
  for (var i = 0; i < tabArray.length; i++) {
    if (url === tabArray[i].url) {
      return i;
    }
  }
  return -1;
}