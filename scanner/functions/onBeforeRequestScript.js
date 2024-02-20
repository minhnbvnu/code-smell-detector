function onBeforeRequestScript(details) {
  for (let item in BLOCKLIST) {
    let urls = BLOCKLIST[item].urls;
    let scripts = BLOCKLIST[item].allowScript;
    if (scripts == undefined)
      continue;
    if (urls != undefined) {
      for (let item in urls) {
        if (urls[item].test(details.initiator) ||
            urls[item].test(details.originUrl)) {
          for (let item in scripts) {
            if (details.url.match(matchPatternToRegExp(scripts[item])))
              return {cancel: false};
          }
        }
      }
    }
  }
  return {cancel: true};
}