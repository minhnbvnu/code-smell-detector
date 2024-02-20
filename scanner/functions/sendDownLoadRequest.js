async function sendDownLoadRequest(nasHttpTriggerPath, tmpNasZipPath) {
  const urlPath = nasHttpTriggerPath + 'download';
  const query = {};
  const body = { tmpNasZipPath };

  return await postRequest(urlPath, query, body, null, {
    rawBuf: true
  });
}