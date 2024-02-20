async function makeSlsAuto(projectName, description, logstoreName) {
  await makeSlsProject(projectName, description);

  await makeLogstore({
    projectName,
    logstoreName
  });

  await makeLogstoreIndex(projectName, logstoreName);
}