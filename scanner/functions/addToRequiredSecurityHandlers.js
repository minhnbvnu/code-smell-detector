function addToRequiredSecurityHandlers(requiredSecurityHandlers, security) {
  if (Array.isArray(security)) {
    security.forEach(function (scheme) {
      Object.keys(scheme)
        .map(toQuoted)
        .forEach(function (quoted) {
          if (requiredSecurityHandlers.indexOf(quoted) === -1) {
            requiredSecurityHandlers.push(quoted);
          }
        });
    });
    requiredSecurityHandlers.sort();
  }
}