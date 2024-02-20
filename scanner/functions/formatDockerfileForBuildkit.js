async function formatDockerfileForBuildkit(dockerfilePath, fromSrcToDstPairs, baseDir, targetBuildStage) {
  if (!fromSrcToDstPairs) {
    debug('There are no fromSrcToDstPairs');
    return;
  }
  const dockerfileContent = await convertDockerfileToBuildkitFormat(dockerfilePath, fromSrcToDstPairs, baseDir, targetBuildStage);

  await fs.writeFile(dockerfilePath, dockerfileContent);
}