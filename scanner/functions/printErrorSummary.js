function printErrorSummary(stats, args) {
  // Form a table of the main errors one row per type
  const table = new Table({
    head: ['Type', 'Count', 'Invalid', 'Inv %', 'Unique Errors'],
    style: {head: ['white', 'bold']}
  });

  for (const message in stats.messages) {
    const count = stats.messages[message] || 0;
    const errors = stats.validationErrors[message] || 0;
    const errPer = (errors / count) * 100;

    const uniqueErrors = stats.uniqueErrors[message];
    const uniqueErrorCount = uniqueErrors ? Object.keys(uniqueErrors).length : 0;

    const row = [message, count, errors, errPer.toFixed(1), uniqueErrorCount];

    if (errors) {
      const coloredRow = [];
      row.forEach(e => {
        coloredRow.push(colors.red.bold(e));
      });
      table.push(coloredRow);
    } else {
      table.push(row);
    }
  }

  // console.log(stats);
  console.log(table.toString());
}