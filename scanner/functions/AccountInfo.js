function AccountInfo(account, dao) {
  this.user = account;
  this.dao = dao;

  this.collections = {};
  this.activeDomain = null;
}