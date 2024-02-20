async function buildInProcess(serviceName, functionName, codeUri, runtime, funcArtifactDir, verbose, stages) {
  const builder = new fcBuilders.Builder(serviceName, functionName, codeUri, runtime, funcArtifactDir, verbose, stages);
  await builder.build();
}