function onProjectLicensePreset(license) {
    const projectLicense = document.getElementById('projectLicense');
    projectLicense.value = licenseTable[license];
    onProjectMetadataChanged();
}