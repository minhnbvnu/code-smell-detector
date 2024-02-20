function printOutput(uiOk, verbose_level, prefix, data) {
  // exit if verbose is zero
  if (verbose_level === 0 || !data) {
    return;
  }

  // print 'prefix' before command
  var ui_prefix = prefix ? lazy.colors.gray(prefix) : '';
  var original_output = removeAllLinesByRegex(data.toString(), /^$/gm);
  var prefixed_output = original_output.replace(/^(.*)/gm, ui_prefix + lazy.colors.gray(' $1'));

  uiOk(prefixed_output);
}