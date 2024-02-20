function onExtensionInstalled(details) {
  // No permissions
  if (!chrome.notifications) {
    return;
  }

  if (details.reason != "update") {
    return;
  }

  var changelog = {
    2012: "Breaking change: please update the host app to at least v2.0.12",
    2023: "New major version will be released on Sat, 13 April. Plan for maintenance, Browserpass will stop working until you update native host app to v3! For more info, see README in https://github.com/browserpass/browserpass"
  };

  var parseVersion = version => parseInt(version.replace(/\./g, ""));
  var newVersion = parseVersion(chrome.runtime.getManifest().version);
  var prevVersion = parseVersion(details.previousVersion);

  Object.keys(changelog)
    .sort()
    .forEach(function(version) {
      if (version > prevVersion && version <= newVersion) {
        chrome.notifications.create(version, {
          title: "browserpass: Important changes",
          message: changelog[version],
          iconUrl: "icon-lock.png",
          type: "basic"
        });
      }
    });
}