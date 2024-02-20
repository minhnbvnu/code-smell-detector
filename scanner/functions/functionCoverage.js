function functionCoverage(expected=[], summaryKey='pct'){
  let summary = JSON.parse(fs.readFileSync('coverage/coverage-summary.json'));

  expected.forEach((item, idx) => {
    assert(
      summary[item.file].functions[summaryKey] === item[summaryKey],

      `For condition ${idx} - expected ${item[summaryKey]} %,` +
      `saw - ${summary[item.file].functions[summaryKey]} %`
    )
  });
}