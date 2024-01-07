function addSignatureReturns(f) {
  const returnTypes = getSignatureReturns(f);

  f.signature = '<span class="signature">' + (f.signature || '') + '</span>';

  if (returnTypes.length) {
    f.signature +=
      '<span class="fa fa-arrow-circle-right"></span><span class="type-signature returnType">' +
      (returnTypes.length ? '{' + returnTypes.join(' | ') + '}' : '') +
      '</span>';
  }
}