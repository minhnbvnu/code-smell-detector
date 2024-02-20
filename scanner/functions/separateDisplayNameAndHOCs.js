function separateDisplayNameAndHOCs(displayName, type) {
  if (displayName === null) {
    return [null, null];
  }

  let hocDisplayNames = null;

  switch (type) {
    case types["e" /* ElementTypeClass */]:
    case types["g" /* ElementTypeForwardRef */]:
    case types["h" /* ElementTypeFunction */]:
    case types["j" /* ElementTypeMemo */]:
      if (displayName.indexOf('(') >= 0) {
        const matches = displayName.match(/[^()]+/g);

        if (matches != null) {
          displayName = matches.pop();
          hocDisplayNames = matches;
        }
      }

      break;

    default:
      break;
  }

  return [displayName, hocDisplayNames];
}