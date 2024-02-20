function generateCSV(report) {
  var csv = [];
  var count = report.count;
  var countries = report.countries.sort();
  var gateways = Object.keys(count).sort();
  csv.push('Country,' + gateways.join(','));
  for (var i = 0; i < countries.length; i++) {
    var line = [countries[i]];
    for (var j = 0; j < gateways.length; j++)
      line.push(count[gateways[j]][countries[i]] || 0);
    csv.push(line.join(','));
  }
  return csv.join('\n');
}