function displayChanges(changes) {
  if (_.isEmpty(changes)) { return; }
  console.log(`\nROS ChangeSet Changes:\n`);

  const table = getTableInstance(tableHeads);

  const map = new Map();

  _.forEach(changes, change => {
    // key: [LogicalResourceId, ResourceType, Action]
    // value: [Name1, Name2.....]
    const logicalResourceId = change.ResourceChange.LogicalResourceId;
    const resourceType = change.ResourceChange.ResourceType;
    const action = change.ResourceChange.Action;

    const key = [logicalResourceId, resourceType, action];
    const value = change.ResourceChange.Details.map(detail => detail.Target.Name);
    map.set(key, value);
  });

  for (let [key, value] of map.entries()) {

    const valueSize = value.length;

    const line = [
      {rowSpan: valueSize, content: key[0], vAlign: 'center'},
      {rowSpan: valueSize, content: key[1], vAlign: 'center'},
      {rowSpan: valueSize, content: key[2], vAlign: 'center'}
    ];

    if (_.isEmpty(value)) {

      line.push('');
      table.push(line);
    } else {
      let first = true;

      for (const pro of value) {
        if (first) {
          line.push(pro);
          table.push(line);
          first = false;
        } else {
          table.push([pro]);
        }
      }
    }
  }
  console.log(table.toString());
  console.log();
}