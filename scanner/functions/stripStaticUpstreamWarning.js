function stripStaticUpstreamWarning(docblock) {
  if (!docblock) {
    return docblock;
  }
  // Esprima strips out the starting and ending tokens, so add them back
  docblock = '/*' + docblock + '*/\n';
  return docblock;
}