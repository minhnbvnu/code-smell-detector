function blockList(wholeContent) {

  return [...wholeContent.matchAll(/<\!--(.*?)--\>/g)].map(e => e[1]);
}