function validateShorthandPropertyCollisionInDev(
  styleUpdates,
  nextStyles,
) {
  if (!warnAboutShorthandPropertyCollision) {
    return;
  }

  if (!nextStyles) {
    return;
  }

  const expandedUpdates = expandShorthandMap(styleUpdates);
  const expandedStyles = expandShorthandMap(nextStyles);
  const warnedAbout = {};
  for (const key in expandedUpdates) {
    const originalKey = expandedUpdates[key];
    const correctOriginalKey = expandedStyles[key];
    if (correctOriginalKey && originalKey !== correctOriginalKey) {
      const warningKey = originalKey + ',' + correctOriginalKey;
      if (warnedAbout[warningKey]) {
        continue;
      }
      warnedAbout[warningKey] = true;
      warning(
        false,
        '%s a style property during rerender (%s) when a ' +
          'conflicting property is set (%s) can lead to styling bugs. To ' +
          "avoid this, don't mix shorthand and non-shorthand properties " +
          'for the same value; instead, replace the shorthand with ' +
          'separate values.',
        isValueEmpty(styleUpdates[originalKey]) ? 'Removing' : 'Updating',
        originalKey,
        correctOriginalKey,
      );
    }
  }
}