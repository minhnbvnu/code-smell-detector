function prepDefaults(details) {
  // We couldn't set this default above in case of real data, so if there's
  // still no includes, set the default of include everything.
  if (details.includes.length == 0 && details.matches.length == 0) {
    details.includes.push('*');
  }

  if (details.grants.includes('none') && details.grants.length > 1) {
    details.grants = ['none'];
  }

  return details;
}