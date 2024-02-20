function getUpdateCommand(installationMethod) {
  if (installationMethod === 'tar') {
    return `curl --compressed -o- -L ${(_constants || _load_constants()).YARN_INSTALLER_SH} | bash`;
  }

  if (installationMethod === 'homebrew') {
    return 'brew upgrade yarn';
  }

  if (installationMethod === 'deb') {
    return 'sudo apt-get update && sudo apt-get install yarn';
  }

  if (installationMethod === 'rpm') {
    return 'sudo yum install yarn';
  }

  if (installationMethod === 'npm') {
    return 'npm install --global yarn';
  }

  if (installationMethod === 'chocolatey') {
    return 'choco upgrade yarn';
  }

  if (installationMethod === 'apk') {
    return 'apk update && apk add -u yarn';
  }

  if (installationMethod === 'portage') {
    return 'sudo emerge --sync && sudo emerge -au sys-apps/yarn';
  }

  return null;
}