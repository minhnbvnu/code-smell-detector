function displayEventsStatus(events, stackName) {

  const table = new Table({
    head: eventTableHeads,
    style: {
      head: ['green'],
      border: []
    },
    colWidths: [30, 20] //set the widths of each column (optional)
  });

  events.filter(f => f.LogicalResourceId !== stackName)
    .forEach(e => {
      table.push([e.LogicalResourceId, e.Status]);
    });

  log(table.toString() + '\n');
}