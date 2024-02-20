function printGameOver() {
  var gameTxt = cbl.print('game', { dataOnly: true });
  var overTxt = cbl.print('over', { dataOnly: true });
  overTxt.shift();
  var combinedTxt = [...gameTxt, ...overTxt];
  var finalTxt = cbl.dataUtils('pad', combinedTxt, {left: 2, right: 1, bottom: 2});

  cbl.setData(finalTxt);
}