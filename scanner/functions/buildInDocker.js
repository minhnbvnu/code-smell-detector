async function buildInDocker(serviceName, serviceRes, functionName, functionRes, baseDir, codeUri, funcArtifactDir, verbose, preferredImage, stages) {
  const opts = await buildOpts.generateBuildContainerBuildOpts(serviceName, 
    serviceRes, 
    functionName,
    functionRes,
    baseDir,
    codeUri,
    funcArtifactDir,
    verbose, 
    preferredImage,
    stages);

  const usedImage = opts.Image;

  if (!preferredImage) {
    await docker.pullImageIfNeed(usedImage);
  }

  console.log('\nbuild function using image: ' + usedImage);

  // todo: 1. create container, copy source code to container
  // todo: 2. build and then copy artifact output 

  const errorTransform = processorTransformFactory({
    serviceName: serviceName,
    functionName: functionName,
    errorStream: process.stderr
  });

  const exitRs = await docker.run(opts, null, process.stdout, errorTransform);
  if (exitRs.StatusCode !== 0) {
    throw new Error(`build function ${serviceName}/${functionName} error`);
  }
}