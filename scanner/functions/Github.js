function Github(github_api) {
  this.github_api = github_api;
  this.gitConfig = {
    clientId: this.github_api.client_id,
    clientSecret: this.github_api.client_secrets,
    redirect: this.github_api.redirect_url,
    proxy: true,
    scope: ['user:email'],
  };
}