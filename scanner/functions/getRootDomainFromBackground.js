async function getRootDomainFromBackground(url) {
  // Send request to background to parse URL via PSL
  const backgroundResp = await browser.runtime.sendMessage({
    message: "get-root-domain",
    url
  });

  return backgroundResp;
}