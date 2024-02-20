async function cpFromNasToLocal(nasPath, localDir, tpl, baseDir, tplPath) {

  const { nasPath: resolveNasPath, serviceName } = getNasPathAndServiceFromNasUri(nasPath, tpl);
  // fun nas init
  await deployNasService(baseDir, tpl, serviceName, tplPath);

  const nasHttpTriggerPath = getNasHttpTriggerPath(serviceName);

  const res = await nasPathExsit(nasHttpTriggerPath, resolveNasPath);
  if (!res.data) { throw new Error(`${nasPath} is not exsit.`); }

  console.log(`zipping ${resolveNasPath}`);
  const tmpNasZipPath = path.posix.join(path.dirname(resolveNasPath), `.fun-nas-generated.zip`);
  await sendZipRequest(nasHttpTriggerPath, resolveNasPath, tmpNasZipPath);
  console.log(`${green('✔')} zip done`);

  console.log('downloading...');
  const localZipPath = path.join(process.cwd(), '.fun', 'nas', '.fun-nas-generated.zip');
  const rs = await sendDownLoadRequest(nasHttpTriggerPath, tmpNasZipPath);
  console.log(`${green('✔')} download done`);

  await writeBufToFile(localZipPath, rs.data);

  console.log('unzipping file');
  await extractZipTo(localZipPath, path.resolve(localDir));
  console.log(`${green('✔')} unzip done`);

  // clean
  await sendCleanRequest(nasHttpTriggerPath, tmpNasZipPath);
  await fs.remove(localZipPath);

  console.log(`${green('✔')} download completed`);
}