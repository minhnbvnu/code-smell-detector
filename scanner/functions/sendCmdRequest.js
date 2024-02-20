async function sendCmdRequest(nasHttpTriggerPath, cmd) {
  const urlPath = nasHttpTriggerPath + 'commands';
  const query = {};
  const body = { cmd };

  return await postRequest(urlPath, query, body);
}