async function isAddedToFacebookContainer (url) {
  const fbcStorage = await browser.storage.local.get();
  const rootDomain = getRootDomain(url);
  if (fbcStorage.domainsAddedToFacebookContainer.includes(rootDomain)) {
    return true;
  }
  return false;
}