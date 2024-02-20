async function ensureFilesModified(tplPath) {
  const modifiedTimes = await getModifiedTimestamps(tplPath);

  if (!_.isEmpty(modifiedTimes)) {
    throw new Error(`
        ${Object.keys(modifiedTimes).join('\n\t')}\n` +
`
Fun detected the above path have been modified. Please execute ‘fun build’ to compile your functions.`);
  }
}