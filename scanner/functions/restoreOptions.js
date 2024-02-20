function restoreOptions() {
  function setCurrentSite(site, status) {
    document.querySelector('#' + site).checked = status;
  }

  chrome.storage.local.get('sites', function(result) {
    for (let site in result.sites)
      setCurrentSite(site, result.sites[site]);
  });
}