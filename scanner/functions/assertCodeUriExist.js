async function assertCodeUriExist(codeUri) {
  if (!(await fs.pathExists(codeUri))) {
    throw new Error(`CodeUri ${codeUri} is not exist.`);
  }
}