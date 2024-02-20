function Authorize(authorizeConfig) {
  this.authorize = authorizeConfig;
  this.cipherKey = crypto.createHash('sha256').update(this.authorize.secret).digest();
}