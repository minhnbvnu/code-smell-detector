async function deployLogs(resourcesDefinition) {
  for (const [projectName, v] of Object.entries(resourcesDefinition)) {
    if ((v || {}).Type === 'Aliyun::Serverless::Log') {
      console.log(`Waiting for log service project ${projectName} to be deployed...`);
      const properties = (v || {}).Properties;

      const description = properties.Description || '';
      await makeSlsProject(projectName, description);

      await deployLogstore(projectName, v);
      console.log(green(`log serivce project ${projectName} deploy success\n`));
    }
  }
}