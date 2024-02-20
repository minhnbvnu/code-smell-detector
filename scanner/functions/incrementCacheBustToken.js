function incrementCacheBustToken(settings) {
  var c = settings.cache_bust_token;
  if (parseInt(c) != +c) {
    warn('cache_bust_token should be a positive integer');
  } else {
    updateSettingsEntry('cache_bust_token', +c + 1);
  }
}