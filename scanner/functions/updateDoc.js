function updateDoc (docFilename) {
  var contents = fs.readFileSync(docFilename, 'utf-8');
  if (versionRegex.exec(contents)) {
    contents = contents.replace(versionRegex, nextVersion);
    fs.writeFileSync(docFilename, contents);
  }
}