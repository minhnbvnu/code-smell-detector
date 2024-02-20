async function installNpmDependency(configPath, id, flags) {
  const [_, org, name, tag] = id.match(/^(?:@([^/]+)\/)?([^@]+)(?:@(.*))?/);
  const pkg = org ? `@${org}/${name}` : name;
  const info = await json(pkg).catch((err) => err);
  if (info.statusCode == 404)
    throw new Error(`Couldn't fetch package info for ${id}`);
  const selected = info["dist-tags"][tag || "latest"];
  addNpmDependency(configPath, [info.name, selected], flags);
}