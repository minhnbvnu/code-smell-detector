async function sendZipRequest(nasHttpTriggerPath, nasPath, tmpNasZipPath) {
  const cmd = `cd ${path.dirname(nasPath)} && zip -r ${tmpNasZipPath} ${path.basename(nasPath)}`;
  return await sendCmdRequest(nasHttpTriggerPath, cmd);
}