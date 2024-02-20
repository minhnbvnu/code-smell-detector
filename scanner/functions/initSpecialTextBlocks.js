function initSpecialTextBlocks() {
  var rxp = /^ai2html-(css|js|html|settings|text|html-before|html-after)\s*$/;
  var settings = null;
  var code = {};
  forEach(doc.textFrames, function(thisFrame) {
    // var contents = thisFrame.contents; // caused MRAP error in AI 2017
    var type = null;
    var match, lines;
    if (thisFrame.lines.length > 1) {
      match = rxp.exec(thisFrame.lines[0].contents);
      type = match ? match[1] : null;
    }
    if (!type) return; // not a special block
    if (objectIsHidden(thisFrame)) {
      if (type == 'settings') {
        error('Found a hidden ai2html-settings text block. Either delete or hide this settings block.');
      }
      warn('Skipping a hidden ' +  match[0] + ' settings block.');
      return;
    }
    lines = stringToLines(thisFrame.contents);
    lines.shift(); // remove header
    // Reset the name of any non-settings text boxes with name ai2html-settings
    if (type != 'settings' && thisFrame.name == 'ai2html-settings') {
      thisFrame.name = '';
    }
    if (type == 'settings' || type == 'text') {
      settings = settings || {};
      if (type == 'settings') {
        // set name of settings block, so it can be found later using getByName()
        thisFrame.name = 'ai2html-settings';
      }
      parseSettingsEntries(lines, settings);

    } else { // import custom js, css and html blocks
      code[type] = code[type] || [];
      code[type].push(cleanCodeBlock(type, lines.join('\r')));
    }
    if (objectOverlapsAnArtboard(thisFrame)) {
      // An error will be thrown if trying to hide a text frame inside a
      // locked layer. Solution: unlock any locked parent layers.
      if (objectIsLocked(thisFrame)) {
        unlockObject(thisFrame);
      }
      hideTextFrame(thisFrame);
    }
  });

  var htmlBlockCount = (code.html || []).length + (code['html-before'] || []).length +
    (code['html-after'] || []).length;
  if (code.css)  {message("Custom CSS blocks: " + code.css.length);}
  // if (code.html) {message("Custom HTML blocks: " + code.html.length);}
  if (htmlBlockCount > 0) {message("Custom HTML blocks: " + htmlBlockCount);}
  if (code.js)   {message("Custom JS blocks: " + code.js.length);}

  return {code: code, settings: settings};
}