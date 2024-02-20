function displayKey(prefix, key) {
  $('#' + prefix + '_key').val(key.key);
  $('#' + prefix + '_ctrl').attr('checked', key.ctrl);
  $('#' + prefix + '_shift').attr('checked', key.shift);
  $('#' + prefix + '_alt').attr('checked', key.alt);
  $('#' + prefix + '_meta').attr('checked', key.meta);
}