async function promptForMountPoints(mountPoints) {

  const choicesNas = mountPoints.map(m => `(ServerAddr)${m.ServerAddr},(MountDir)${m.MountDir}`);

  return await inquirer.prompt([{
    type: 'list',
    message: 'select a nas service?',
    name: 'mountDir',
    choices: choicesNas,
    filter: (val) => {
      const colonSplit = _.split(val, ',');
      return _.trimStart(colonSplit[1], '(MountDir)');
    }
  }]);
}