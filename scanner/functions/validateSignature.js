async function validateSignature(req, res, method) {
  const profile = await getProfile();

  const signature = FC.getSignature(profile.accessKeyId, profile.accessKeySecret, method, req.path, req.headers, req.queries);

  const clientSignature = req.headers['authorization'];

  if (signature !== clientSignature) {
    res.status(500);
    res.send(`Signature doesn't match, request signature is ${clientSignature}, but server signature is ${signature}`);
    return false;
  }

  return true;
}