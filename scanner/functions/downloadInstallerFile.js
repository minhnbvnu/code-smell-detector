async function downloadInstallerFile(from, to) {
    if (process.platform !== 'win32') {
      throw new Error('Could not install an `msi` file on the current platform');
    }

    const stream = await getDownloadStream(from);
    const installerFile = getTempFileName('installer.msi');

    await writeDownloadStream(stream, installerFile, `${to}.etag`);
    return runInstaller(installerFile, from, to);
  }