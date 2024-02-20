function displayParameters(parameters) {
  if (_.isEmpty(parameters)) { return; }

  console.log('ROS Stack Parameters:\n');

  const table = getTableInstance(parametersTableHeads);

  _.forEach(parameters, p => {
    table.push([p.ParameterKey, p.ParameterValue]);
  });

  console.log(table.toString() + '\n');
}