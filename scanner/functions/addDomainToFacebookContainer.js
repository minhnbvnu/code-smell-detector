async function addDomainToFacebookContainer (url) {
  const fbcStorage = await browser.storage.local.get();
  const rootDomain = getRootDomain(url);
  fbcStorage.domainsAddedToFacebookContainer.push(rootDomain);
  await browser.storage.local.set({"domainsAddedToFacebookContainer": fbcStorage.domainsAddedToFacebookContainer});
}