async function promptForFileSystems(fileSystems) {

  let choicesNas = fileSystems.map(m => `(FileSystemId)${m.fileSystemId}, (Description)${m.description}, (StorageType)${m.storageType}, (Availability Zone)${m.zoneId}`);

  return await inquirer.prompt([{
    type: 'list',
    message: 'select a nas service?',
    name: 'fileSystemId',
    choices: choicesNas,
    filter: (val) => {
      const colonSplit = _.split(val, ',');
      return _.trimStart(colonSplit[0], '(FileSystemId)');
    }
  }]);
}