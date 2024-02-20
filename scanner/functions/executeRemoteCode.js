function executeRemoteCode(lang, codeDiv) {
  var slide = codeDiv.closest('div.content');
  var index = slide.find('code.execute').index(codeDiv);
  var path  = slide.attr('ref');

  setExecutionSignal(true, codeDiv);
  $.get('execute/'+lang, {path: path, index: index}, function(result) {
    if (result != null) displayHUD(result);
    setExecutionSignal(false, codeDiv);
  });
}