function getSnippetHeader (ignoreWarnings) {
  if (ignoreWarnings) {
    return 'library(RCurl)\noptions(warn=-1)\n';
  }
  return 'library(RCurl)\n';

}