async function clearPrevBuild() {
  await remove(getBuildPath());
  await mkdir(getBuildPath());
}