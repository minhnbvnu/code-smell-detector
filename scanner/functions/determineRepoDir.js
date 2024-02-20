async function determineRepoDir(context, cloneToDir = '.', checkout) {
  debug('determine repo dir...');
  let clean = false;
  const template = expandAbbreviations(context.location, Object.assign(BUILTIN_ABBREVIATIONS, context.templates));
  let repoDir = template;
  if (isRepoUrl(template)) {
    clean = true;
    repoDir = await clone(template, cloneToDir, checkout);
  }
  return { repoDir, clean };
}