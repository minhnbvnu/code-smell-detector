async function generateIndexFile(buildId) {
  console.log('Generating index file...');

  const indexFile = renderIndex({
    scriptFilename: `main-${buildId}.js`
  });
  await writeFile(getBuildPath('index.html'), indexFile, 'utf8');
}