async function displayOutputs(outputs) {

  if (_.isEmpty(outputs)) { return ; }

  console.log('ROS Stack Outputs:\n');

  const table = getTableInstance(outputsTableHeads);

  _.forEach(outputs, p => {

    table.push([p.OutputKey, p.OutputValue, p.Description]);
  });

  console.log(table.toString() + '\n');
}