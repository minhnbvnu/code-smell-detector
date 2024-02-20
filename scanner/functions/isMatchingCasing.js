function isMatchingCasing(casing1, casing2) {
  const equivalentCasings = [KeyCasing.default, KeyCasing.lower];
  if (isStringHasLength(casing1) && isStringHasLength(casing2)) {
    let isRealCase = KeyCasing[casing1.toLowerCase()] !== undefined;
    let casingsMatch = casing1 === casing2;
    let casingsAreEquivalent = [casing1, casing2].every((casing) => {
      return casing === KeyCasing.lower || casing === KeyCasing.default;
    });
    return isRealCase && (casingsMatch || casingsAreEquivalent);
  } else if (isStringHasLength(casing1)) {
    return equivalentCasings.includes(casing1.toLowerCase());
  } else if (isStringHasLength(casing2)) {
    return equivalentCasings.includes(casing2.toLowerCase());
  } else {
    return casing1 === undefined && casing2 === undefined;
  }
}