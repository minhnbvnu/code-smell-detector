function sUFclick (event) {
    // Getting chosen URL
    let url = gURLBar.untrimmedValue;
    // Check event (only middle-click) and URL
    if (event.button != 1 || url == null || url.length <= 0) {
      return;
    }
    // Stop event propagation (for X server/linux)
    event.stopPropagation();
		// Create valid URL from given URL
		let cleanedUrl = new URL(url);
		// Load valid URL
    openLinkIn(cleanedUrl && cleanedUrl.href, 'current', {allowThirdPartyFixup: true, targetBrowser: gBrowser.selectedBrowser, indicateErrorPageLoad: true, allowPinnedTabHostChange: true, disallowInheritPrincipal: true, allowPopups: false, triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal()});
  }