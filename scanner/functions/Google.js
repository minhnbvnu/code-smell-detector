function Google(google_api) {
  this.google_api = google_api;

  this.googleConfig = {
    clientId: this.google_api.client_id,
    clientSecret: this.google_api.client_secrets,
    redirect: this.google_api.google_profile_add_redirect_url,
  };
  oAuth2Client = new google.auth.OAuth2(
    this.google_api.client_id,
    this.google_api.client_secrets,
    this.google_api.google_profile_add_redirect_url
  );
}