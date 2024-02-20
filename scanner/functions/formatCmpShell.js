function formatCmpShell(rows) {
  const contractLength = Math.max(8, ...rows.map(({ contract }) => contract.length));
  const methodLength = Math.max(7, ...rows.map(({ method }) => method.length));

  const COLS = [
    { txt: '', length: 0 },
    { txt: 'Contract', length: contractLength },
    { txt: 'Method', length: methodLength },
    { txt: 'Min', length: 30 },
    { txt: 'Max', length: 30 },
    { txt: 'Avg', length: 30 },
    { txt: '', length: 0 },
  ];
  const HEADER = COLS.map(entry => chalk.bold(center(entry.txt, entry.length || 0)))
    .join(' | ')
    .trim();
  const SEPARATOR = COLS.map(({ length }) => (length > 0 ? '-'.repeat(length + 2) : ''))
    .join('|')
    .trim();

  return [
    '',
    HEADER,
    ...rows.map(entry =>
      [
        '',
        chalk.grey(entry.contract.padEnd(contractLength)),
        entry.method.padEnd(methodLength),
        ...formatCellShell(entry.min),
        ...formatCellShell(entry.max),
        ...formatCellShell(entry.avg),
        '',
      ]
        .join(' | ')
        .trim(),
    ),
    '',
  ]
    .join(`\n${SEPARATOR}\n`)
    .trim();
}