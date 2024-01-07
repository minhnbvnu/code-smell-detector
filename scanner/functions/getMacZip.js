function getMacZip(req, res) {
  console.log(`Received request for atom-mac.zip, sending it`);
  res.sendFile(path.join(buildPath, 'atom-mac.zip'));
}