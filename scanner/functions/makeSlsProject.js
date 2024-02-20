async function makeSlsProject(projectName, description) {

  const sls = await getSlsClient();
  const projectExist = await slsProjectExist(sls, projectName);

  let create = false;
  if (projectExist) {
    // no update project api
    // only description can be updated by console.
    debug(`sls project exists, but could not be updated`);
  } else {
    await createSlsProject(sls, projectName, description);
    create = true;
  }

  return create;
}