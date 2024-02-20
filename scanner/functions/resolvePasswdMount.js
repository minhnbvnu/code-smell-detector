async function resolvePasswdMount() {
  if (process.platform === 'linux') {
    return {
      Type: 'bind',
      Source: await generatePwdFile(),
      Target: '/etc/passwd',
      ReadOnly: true
    };
  }

  return null;
}