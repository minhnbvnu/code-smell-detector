function regionScoreboardScoreHistoryTable(result) {
  var history = result.scoreHistory;
  var table = '<table class="checkpoint_table"><thead><tr><th>Checkpoint</th><th>Enlightened</th><th>Resistance</th></tr></thead>';

  for(var i=0; i<history.length; i++) {
    table += '<tr><td>' + history[i][0] + '</td><td>' + digits(history[i][1]) + '</td><td>' + digits(history[i][2]) + '</td></tr>';
  }

  table += '</table>';
  return table;
}