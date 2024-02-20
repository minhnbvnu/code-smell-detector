function branchCoverage(expected=[], summaryKey='pct'){
  let summary = JSON.parse(fs.readFileSync('coverage/coverage-summary.json'));

  expected.forEach((item, idx) => {
    assert(
      summary[item.file].branches.pct === item[summaryKey],

      `For condition ${idx} - expected ${item[summaryKey]} %,` +
      `saw - ${summary[item.file].branches[summaryKey]} %`
    )
  });
}