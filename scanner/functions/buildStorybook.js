function buildStorybook(currentPackage, outputDirectory, npmScriptName) {
  console.log(`=> Building storybook for: ${currentPackage.name}`);

  // clear and re-create the out directory
  shell.rm('-rf', outputDirectory);
  shell.mkdir(outputDirectory);

  if (currentPackage.scripts[npmScriptName]) {
    publishUtils.exec(`npm run ${npmScriptName} -- -o ${outputDirectory}`);
  } else {
    publishUtils.exec(`build-storybook  -o ${outputDirectory}`);
  }
}