async function removeDomainFromFacebookContainer (domain) {
  const fbcStorage = await browser.storage.local.get();
  const domainIndex = fbcStorage.domainsAddedToFacebookContainer.indexOf(domain);
  fbcStorage.domainsAddedToFacebookContainer.splice(domainIndex, 1);
  await browser.storage.local.set({"domainsAddedToFacebookContainer": fbcStorage.domainsAddedToFacebookContainer});
}