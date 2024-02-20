function getTrailingAnnotatorArguments(funcMeta, annotatorParams) {
  if (annotatorParams === null) {
    return util.format(', %j)', funcMeta);
  }
  return util.format(', %j, %j)', funcMeta, annotatorParams);
}