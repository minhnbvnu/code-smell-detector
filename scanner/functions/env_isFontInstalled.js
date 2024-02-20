function env_isFontInstalled(fontName) {
  var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
  var testText = 'mmmmmmmmmmwwwww';
  var testSize = '200px';
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = testSize + " '" + testFontName + "'";
  var originalWidth = context.measureText(testText).width;
  context.font = testSize + ' ' + validFontName(fontName) + ', "' + testFontName + '"';
  var width = context.measureText(testText).width;
  return originalWidth !== width;
}