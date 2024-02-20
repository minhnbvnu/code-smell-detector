function onAuthRequired(url, requestDetails, response) {
  // ask the user before sending credentials to a different domain
  var launchHost = url.match(/:\/\/([^\/]+)/)[1];
  if (launchHost !== requestDetails.challenger.host) {
    var message =
      "You are about to send login credentials to a domain that is different than " +
      "the one you lauched from the browserpass extension. Do you wish to proceed?\n\n" +
      "Launched URL: " +
      url +
      "\n" +
      "Authentication URL: " +
      requestDetails.url;
    if (!confirm(message)) {
      return {};
    }
  }

  // ask the user before sending credentials over an insecure connection
  if (!requestDetails.url.match(/^https:/i)) {
    var message =
      "You are about to send login credentials via an insecure connection!\n\n" +
      "Are you sure you want to do this? If there is an attacker watching your " +
      "network traffic, they may be able to see your username and password.\n\n" +
      "URL: " +
      requestDetails.url;
    if (!confirm(message)) {
      return {};
    }
  }

  // supply credentials
  return {
    authCredentials: {
      username: response.u,
      password: response.p
    }
  };
}