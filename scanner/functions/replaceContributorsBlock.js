function replaceContributorsBlock(filePath, content) {
  const contents = fs.readFileSync(filePath, 'utf8');
  const newContents = contents.replace(/(?:(<!-- contributors:start -->))([^]+?)(?:(<!-- contributors:end -->))/, '$1\n' + content + '\n$3');

  fs.writeFileSync(filePath, newContents);
}