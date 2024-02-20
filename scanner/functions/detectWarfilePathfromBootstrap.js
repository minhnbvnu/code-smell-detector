async function detectWarfilePathfromBootstrap(bootstrapContent) {
  // java -jar $JETTY_RUNNER --port $PORT --path / ${path.relative(codeDir, war)}
  const matched = bootstrapContent.match(new RegExp('(java .*?)-jar (.*?) ([0-9a-zA-Z./_-]+\\.war)', 'm'));
  if (matched) {
    return matched[3];
  }
  return undefined;
}