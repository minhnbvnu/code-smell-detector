function lineCoverage(expected=[]){
  let summary = JSON.parse(fs.readFileSync('coverage/coverage-summary.json'));

  expected.forEach((item, idx) => {
    assert(
      summary[item.file].lines.pct === item.pct,

      `For condition ${idx} - expected ${item.pct} %,` +
      `saw - ${summary[item.file].lines.pct} %`
    )
  });
}