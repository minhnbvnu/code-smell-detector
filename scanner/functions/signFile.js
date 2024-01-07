function signFile(fileToSign) {
    const signCommand = path.resolve(
      __dirname,
      '..',
      'node_modules',
      '@atom',
      'electron-winstaller',
      'vendor',
      'signtool.exe'
    );
    const args = [
      'sign',
      `/f ${certPath}`, // Signing cert file
      `/p ${process.env.ATOM_WIN_CODE_SIGNING_CERT_PASSWORD}`, // Signing cert password
      '/fd sha256', // File digest algorithm
      '/tr http://timestamp.digicert.com', // Time stamp server
      '/td sha256', // Times stamp algorithm
      `"${fileToSign}"`
    ];
    const result = spawnSync(signCommand, args, {
      stdio: 'inherit',
      shell: true
    });
    if (result.status !== 0) {
      // Ensure we do not dump the signing password into the logs if something goes wrong
      throw new Error(
        `Command ${signCommand} ${args
          .map(a =>
            a.replace(process.env.ATOM_WIN_CODE_SIGNING_CERT_PASSWORD, '******')
          )
          .join(' ')} exited with code ${result.status}`
      );
    }
  }