async function createSlsProject(slsClient, projectName, description) {
  await promiseRetry(async (retry, times) => {
    try {
      await slsClient.createProject(projectName, {
        description
      });
    } catch (ex) {
      if (ex.code === 'Unauthorized') {
        throw ex;
      } else if (ex.code === 'ProjectAlreadyExist') {
        throw new Error(red(`error: sls project ${projectName} already exist, it may be in other region or created by other users.`));
      } else if (ex.code === 'ProjectNotExist') {
        throw new Error(red(`Please go to https://sls.console.aliyun.com/ to open the LogServce.`));
      } else {
        debug('error when createProject, projectName is %s, error is: \n%O', projectName, ex);
        console.log(red(`\tretry ${times} times`));
        retry(ex);
      }
    }
  });
}