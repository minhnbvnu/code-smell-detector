function getFriendlyEffect(flags) {
  const effects = {
    1: 'Performed Work',
    2: 'Placement',
    4: 'Update',
    8: 'Deletion',
    16: 'Content reset',
    32: 'Callback',
    64: 'Err',
    128: 'Ref',
  };
  return Object.keys(effects)
    .filter(flag => flag & flags)
    .map(flag => effects[flag])
    .join(' & ');
}