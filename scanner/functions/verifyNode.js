function verifyNode() {
  const fullVersion = process.versions.node;
  const majorVersion = fullVersion.split('.')[0];
  const minorVersion = fullVersion.split('.')[1];
  if (majorVersion >= 11 || (majorVersion === '10' && minorVersion >= 12)) {
    console.log(`Node:\tv${fullVersion}`);
  } else {
    throw new Error(
      `node v10.12+ is required to build Atom. node v${fullVersion} is installed.`
    );
  }
}