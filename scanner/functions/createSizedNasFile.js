async function createSizedNasFile(nasHttpTriggerPath, nasZipFile, fileSize) {
  const cmd = `dd if=/dev/zero of=${nasZipFile} count=0 bs=1 seek=${fileSize}`;
  return await sendCmdRequest(nasHttpTriggerPath, cmd);
}