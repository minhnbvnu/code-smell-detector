function onBeforeRequestXml(details) {
  if (whitelist.indexOf(details.url) !== -1)
    return {cancel: false};
  else
    return {cancel: true};
}