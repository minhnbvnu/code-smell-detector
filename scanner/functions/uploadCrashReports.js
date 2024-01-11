async function uploadCrashReports() {
  const crashesPath = argv.crashReportPath;
  const crashes = glob.sync('/*.dmp', { root: crashesPath });
  const azureBlobPath = argv.azureBlobPath;

  if (crashes && crashes.length > 0) {
    console.log(
      `Uploading ${
        crashes.length
      } private crash reports to Azure Blob Storage under '${azureBlobPath}'`
    );

    await uploadToAzure(
      process.env.ATOM_RELEASES_AZURE_CONN_STRING,
      azureBlobPath,
      crashes,
      'private'
    );
  }
}