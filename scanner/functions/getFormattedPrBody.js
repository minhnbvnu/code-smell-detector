function getFormattedPrBody(data) {
  return [
    '## Proposed Release Notes',
    data.notes,
    '## Links',
    data.links,
    '',
    '## Details',
    ''
  ].join('\n')
}