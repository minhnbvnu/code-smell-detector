function getCurrentCnSiteName(enName) {

  const siteArr = Const.SITECHOICES.filter(site => site.site_name === enName);

  return (siteArr[0] && siteArr[0].site_name_cn) || '';
}