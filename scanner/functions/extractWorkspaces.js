function extractWorkspaces(manifest) {
  if (!manifest || !manifest.workspaces) {
    return undefined;
  }

  if (Array.isArray(manifest.workspaces)) {
    return { packages: manifest.workspaces };
  }

  if (manifest.workspaces.packages && Array.isArray(manifest.workspaces.packages) || manifest.workspaces.nohoist && Array.isArray(manifest.workspaces.nohoist)) {
    return manifest.workspaces;
  }

  return undefined;
}