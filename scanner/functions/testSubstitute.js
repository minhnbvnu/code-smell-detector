function testSubstitute(name, options) {
  testVim(name + '_pcre', function(cm, vim, helpers) {
    cm.setCursor(1, 0);
    CodeMirror.Vim.setOption('pcre', true);
    helpers.doEx(options.expr);
    eq(options.expectedValue, cm.getValue());
  }, options);
  // If no noPcreExpr is defined, assume that it's the same as the expr.
  var noPcreExpr = options.noPcreExpr ? options.noPcreExpr : options.expr;
  testVim(name + '_nopcre', function(cm, vim, helpers) {
    cm.setCursor(1, 0);
    CodeMirror.Vim.setOption('pcre', false);
    helpers.doEx(noPcreExpr);
    eq(options.expectedValue, cm.getValue());
  }, options);
}