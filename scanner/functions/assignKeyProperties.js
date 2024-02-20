function assignKeyProperties(prefix, key) {
  key.key   = $('#' + prefix + '_key').val();
  key.ctrl  = $('#' + prefix + '_ctrl')[0].checked;
  key.shift = $('#' + prefix + '_shift')[0].checked;
  key.alt   = $('#' + prefix + '_alt')[0].checked;
  key.meta  = $('#' + prefix + '_meta')[0].checked;
  return key;
}