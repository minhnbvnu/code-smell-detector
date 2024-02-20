function executeCode() {
  var codeDiv = $(this);

  try {
    var lang = codeDiv.attr("class").match(/\blanguage-(\w+)/)[1];
    switch(lang) {
      case 'javascript':
      case 'coffeescript':
        executeLocalCode(lang, codeDiv);
        break;
      default:
        executeRemoteCode(lang, codeDiv)
        break;
    }
  }
  catch(e) {
    debug('No code block to execute: ' + codeDiv.attr('class'));
  };
}