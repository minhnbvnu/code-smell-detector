function formatCmpMarkdown(rows) {
  const COLS = [
    { txt: '' },
    { txt: 'Contract', align: 'left' },
    { txt: 'Method', align: 'left' },
    { txt: 'Min', align: 'right' },
    { txt: '(+/-)', align: 'right' },
    { txt: '%', align: 'right' },
    { txt: 'Max', align: 'right' },
    { txt: '(+/-)', align: 'right' },
    { txt: '%', align: 'right' },
    { txt: 'Avg', align: 'right' },
    { txt: '(+/-)', align: 'right' },
    { txt: '%', align: 'right' },
    { txt: '' },
  ];
  const HEADER = COLS.map(entry => entry.txt)
    .join(' | ')
    .trim();
  const SEPARATOR = COLS.map(entry => (entry.txt ? alignPattern(entry.align) : ''))
    .join('|')
    .trim();

  return [
    '# Changes to gas costs',
    '',
    HEADER,
    SEPARATOR,
    rows
      .map(entry =>
        [
          '',
          entry.contract,
          entry.method,
          ...formatCellMarkdown(entry.min),
          ...formatCellMarkdown(entry.max),
          ...formatCellMarkdown(entry.avg),
          '',
        ]
          .join(' | ')
          .trim(),
      )
      .join('\n'),
    '',
  ]
    .join('\n')
    .trim();
}