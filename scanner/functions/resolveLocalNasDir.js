function resolveLocalNasDir(runtime, baseDir, codeUri, localDirInNasMappings, serviceName, functionName) {
  let localDir;
  if (runtime === 'java8' || runtime === 'java11') {
    localDir = path.relative(baseDir, path.join(localDirInNasMappings, serviceName, functionName, 'lib'));
  } else {
    localDir = path.relative(baseDir, path.join(codeUri, localDirInNasMappings));
  }
  return localDir;
}