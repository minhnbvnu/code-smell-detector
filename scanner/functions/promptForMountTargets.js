async function promptForMountTargets(mountTargets) {

  const choices = mountTargets.map(m => `(MountTargetDomain)${m.MountTargetDomain}, (VpcId)${m.VpcId}, (VswId)${m.VswId}, (AccessGroupName)${m.AccessGroupName}`);

  return await inquirer.prompt([
    {
      type: 'list',
      message: 'select or confirm mountTargets?',
      name: 'mountTargetDomain',
      choices,
      filter: val => {
        const colonSplit = _.split(val, ',');
        return _.trimStart(colonSplit[0], '(MountTargetDomain)');
      }
    }
  ]);
}