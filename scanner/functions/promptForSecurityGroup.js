async function promptForSecurityGroup(securityGroups) {

  const securityGroupsChoices = securityGroups.map(m => `(SecurityGroupId)${m.SecurityGroupId},(SecurityGroupName)${m.SecurityGroupName},(Description)${m.Description}`);

  return await inquirer.prompt([{
    type: 'list',
    message: 'select a security group?',
    name: 'securityGroupId',
    choices: securityGroupsChoices,
    filter: (val) => {
      const colonSplit = _.split(val, ',');
      return _.trimStart(colonSplit[0], '(SecurityGroupId)');
    }
  }]);
}