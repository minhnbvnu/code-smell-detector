async function resolveImageNameForPull(imageName) {

  const dockerImageRegistry = await resolveDockerRegistry();

  if (dockerImageRegistry) {
    imageName = `${dockerImageRegistry}/${imageName}`;
  }
  return imageName;
}