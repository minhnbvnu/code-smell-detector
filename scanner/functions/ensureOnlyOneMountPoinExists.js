function ensureOnlyOneMountPoinExists(mountPoints) {
  if (mountPoints.length > 1) {
    throw new Error(red(`More than one 'NasConfig' configuration in template.yml.`));
  }
}