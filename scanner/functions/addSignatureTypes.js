function addSignatureTypes(f) {
  const types = helper.getSignatureTypes(f);

  f.signature =
    (f.signature || '') +
    '<span class="type-signature">' +
    (types.length ? ' :' + types.join('|') : '') +
    ' </span>';
}