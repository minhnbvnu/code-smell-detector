async function getSharedPathsOfDockerForMac() {

  const settingsPath = path.join(USER_HOME, 'Library/Group Containers/group.com.docker/settings.json');
  
  const fileData = await fs.readFile(settingsPath, 'utf8');
  
  const settings = JSON.parse(fileData);
  
  if (settings.hasOwnProperty('filesharingDirectories')) {
    return settings.filesharingDirectories;
  }
  return defaultFileSharingPaths;
}