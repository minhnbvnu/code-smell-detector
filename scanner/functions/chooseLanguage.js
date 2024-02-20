function chooseLanguage(locale) {
  // yay for half-baked data storage schemes
  newlocale = locale || document.cookieHash['locale'] || 'auto';

  if(locale){
    document.cookie = "locale="+newlocale;
    location.reload(false);
  } else {
    $('#languageSelector').val(newlocale);
  }
}