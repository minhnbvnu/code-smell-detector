function LinkedIn(linkedIn_api) {
  this.linkedIn_api = linkedIn_api;
  this.LinkedInApiConfig = require('node-linkedin')(
    linkedIn_api.client_id,
    linkedIn_api.client_secret,
    linkedIn_api.redirect_url_page
  );
  this.scope = [
    'r_emailaddress',
    'w_organization_social',
    'r_basicprofile',
    'r_liteprofile',
    'r_organization_social',
    'rw_organization_admin',
    'w_member_social',
  ];
}