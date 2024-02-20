async function updateTrancoList() {
  const resp = await needle(ENDPOINTS.TRANCO_LIST);

  const trancoDomainsCsv = resp.body;

  // Replace everything before a comma with empty string and convert line feeds to ln
  let trancoDomains = trancoDomainsCsv.split(/.*,/).join("");
  trancoDomains = trancoDomains.split(/\r\n/).join("\n");

  try {
    fs.writeFileSync(DB_PATH + "/trancos.txt", trancoDomains);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}