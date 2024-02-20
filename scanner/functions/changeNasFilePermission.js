async function changeNasFilePermission(nasHttpTriggerPath, filePath, filePermission) {
  const cmd = `chmod ${filePermission} ${filePath}`;
  return await sendCmdRequest(nasHttpTriggerPath, cmd);
}