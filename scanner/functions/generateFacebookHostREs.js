function generateFacebookHostREs () {
  for (let facebookDomain of FACEBOOK_DOMAINS) {
    facebookHostREs.push(new RegExp(`^(.*\\.)?${facebookDomain}$`));
  }
}