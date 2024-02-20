async function checkPackagePermission(userName, packageName) {
  try {
    const packagePermissionInfo = JSON.parse(
      await exec(`npm access ls-collaborators ${packageName}`)
    );

    return (
      Object.keys(packagePermissionInfo).includes(userName) &&
      packagePermissionInfo[userName].includes('write')
    );
  } catch (e) {
    signale.error('确认包发布权限失败');
  }
}