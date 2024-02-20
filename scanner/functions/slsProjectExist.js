async function slsProjectExist(slsClient, projectName) {
  let projectExist = true;
  await promiseRetry(async (retry, times) => {
    try {
      await slsClient.getProject(projectName);
    } catch (ex) {
      if (ex.code === 'Unauthorized') {
        throw new Error(red(`Log Service '${projectName}' may create by others, you should use a unique project name.`));
      } else if (ex.code !== 'ProjectNotExist') {
        debug('error when getProject, projectName is %s, error is: \n%O', projectName, ex);

        console.log(red(`\tretry ${times} times`));
        retry(ex);
      } else { projectExist = false; }
    }
  });
  return projectExist;
}