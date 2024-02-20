function getErrorMessage (details) {
    details = details ? ': ' + details : '';
    return '<!-- invalid XML' + details + ' -->';
  }