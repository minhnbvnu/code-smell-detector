async function showResourcesChanges(localYml, remoteYml) {
  const diff = jsonDiff.diff(remoteYml, localYml);

  const resources = diff.Resources;
  const localResources = localYml.Resources;
  const remoteResources = remoteYml.Resources;
  const changes = [];

  if (!resources) { return; }

  changes.push(...processResources(resources, localResources, remoteResources));

  displayChanges(changes);
}