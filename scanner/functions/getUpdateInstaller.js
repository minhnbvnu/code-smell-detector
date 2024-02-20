function getUpdateInstaller(installationMethod) {
  // Windows
  if (installationMethod === 'msi') {
    return (_constants || _load_constants()).YARN_INSTALLER_MSI;
  }

  return null;
}