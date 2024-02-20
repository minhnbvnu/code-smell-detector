async function clearFacebookCookies () {
  // Clear all facebook cookies
  const containers = await browser.contextualIdentities.query({});
  containers.push({
    cookieStoreId: "firefox-default"
  });

  let macAssignments = [];
  if (macAddonEnabled) {
    const promises = FACEBOOK_DOMAINS.map(async facebookDomain => {
      const assigned = await getMACAssignment(`https://${facebookDomain}/`);
      return assigned ? facebookDomain : null;
    });
    macAssignments = await Promise.all(promises);
  }

  FACEBOOK_DOMAINS.map(async facebookDomain => {
    const facebookCookieUrl = `https://${facebookDomain}/`;

    // dont clear cookies for facebookDomain if mac assigned (with or without www.)
    if (macAddonEnabled &&
        (macAssignments.includes(facebookDomain) ||
         macAssignments.includes(`www.${facebookDomain}`))) {
      return;
    }

    containers.map(async container => {
      const storeId = container.cookieStoreId;
      if (storeId === facebookCookieStoreId) {
        // Don't clear cookies in the Facebook Container
        return;
      }

      const cookies = await browser.cookies.getAll({
        domain: facebookDomain,
        storeId
      });

      cookies.map(cookie => {
        browser.cookies.remove({
          name: cookie.name,
          url: facebookCookieUrl,
          storeId
        });
      });
      // Also clear Service Workers as it breaks detecting onBeforeRequest
      await browser.browsingData.remove({hostnames: [facebookDomain]}, {serviceWorkers: true});
    });
  });
}