async function isPublishedOnNpm(package, version) {
  const res = await fetch(`https://registry.npmjs.com/${package}/${version}`);
  return res.ok;
}