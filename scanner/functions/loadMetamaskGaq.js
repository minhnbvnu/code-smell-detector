function loadMetamaskGaq () {
  // extract hits from Google Analytics data from metamask.io phishing warning
  // fetch from https://analytics.google.com/analytics/web/#my-reports/N6OapMZATf-zAzHjpa9Wcw/a37075177w102798190p106879314/%3F_u.dateOption%3Dlast7days%26454-table.plotKeys%3D%5B%5D%26454-table.rowStart%3D0%26454-table.rowCount%3D250/
  const rawCsv = fs.readFileSync(__dirname + '/metamaskGaq.csv', 'utf8')
  const result = parseCsv.parse(rawCsv, {
    skip_empty_lines: true,
    comment: '#',
    columns: true,
  }).map(row => row.Source).map(punycode.toASCII)
  return result
}