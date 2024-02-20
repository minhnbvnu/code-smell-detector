async function CheckIfURLShouldBeBlocked() {
  const siteList = await browser.runtime.sendMessage({
    message: "what-sites-are-added"
  });

  const site = await getRootDomainFromBackground(window.location.href);

  if (siteList.includes(site)) {
    checkForTrackers = false;
  } else {
    await contentScriptInit(false);
  }

}