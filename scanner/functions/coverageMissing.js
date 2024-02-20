function coverageMissing(expected=[]){
  let summary = JSON.parse(fs.readFileSync('coverage/coverage-summary.json'));
  expected.forEach(item => assert(summary[item.file] === undefined))
}