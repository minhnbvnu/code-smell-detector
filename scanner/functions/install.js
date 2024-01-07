function install(installationDirPath, packagedAppFileName, packagedAppPath) {
  if (fs.existsSync(installationDirPath)) {
    console.log(
      `Removing previously installed "${packagedAppFileName}" at "${installationDirPath}"`
    );
    fs.removeSync(installationDirPath);
  }

  console.log(
    `Installing "${packagedAppFileName}" at "${installationDirPath}"`
  );
  fs.copySync(packagedAppPath, installationDirPath);
}