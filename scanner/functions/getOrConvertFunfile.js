async function getOrConvertFunfile(codeUri) {
  const funfilePath = path.join(codeUri, 'Funfile');
  const funymlPath = path.join(codeUri, 'fun.yml');

  let funfileExist = await fs.pathExists(funfilePath);
  const funymlExist = await fs.pathExists(funymlPath);

  // convert funyml to Funfile if funyml exist and Funfile dont exist
  if (!funfileExist && funymlExist) {
    console.log('detecting fun.yml but no Funfile, Fun will convert fun.yml to Funfile');

    await convertFunYmlToFunfile(funymlPath, funfilePath);

    funfileExist = true;
  }

  if (funfileExist) {
    return funfilePath;
  }
  return null;
}