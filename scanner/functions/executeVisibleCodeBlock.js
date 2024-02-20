function executeVisibleCodeBlock()
{
  var code = $('code.execute:visible')
  if (code.length > 0) {
    // make the code block available as $(this) object
    executeCode.call(code[0]);
  }
}