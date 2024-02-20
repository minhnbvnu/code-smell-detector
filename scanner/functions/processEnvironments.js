async function processEnvironments({
  tplPath, tpl, envs, baseDir, codeUri, runtime,
  serviceName, functionName
}) {

  const rs = await updateEnvironments({
    tplPath, tpl, envs, baseDir, codeUri, runtime,
    serviceName, functionName
  });

  if (usingProjectTemplate(tplPath)) {
    return rs;
  }

  const { projectTpl, projectTplPath } = await getTplInfo(tpl, tplPath);

  const result = await updateEnvironments({
    tplPath: projectTplPath, tpl: projectTpl, envs, baseDir, codeUri, runtime,
    serviceName, functionName
  });

  const rootTplPath = getRootTplPath(tplPath);

  await updateTimestamps(tplPath, [rootTplPath, path.dirname(rootTplPath)]);

  return result;
}