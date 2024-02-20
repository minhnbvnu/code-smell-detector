function executeLocalCode(lang, codeDiv) {
  var result = null;

  setExecutionSignal(true, codeDiv);
  setTimeout(function() { setExecutionSignal(false, codeDiv);}, 1000 );

  try {
    switch(lang) {
      case 'javascript':
        result = eval(codeDiv.text());
        break;
      case 'coffeescript':
        result = eval(CoffeeScript.compile(codeDiv.text(), {bare: true}));
        break;
      default:
        result = 'No local exec handler for ' + lang;
    }
  }
  catch(e) {
    result = e.message;
  };
  if (result != null) displayHUD(result);
}