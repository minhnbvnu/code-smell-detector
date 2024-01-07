function chmodNodeFiles(packagedAppPath) {
  console.log(`Changing permissions for node files in ${packagedAppPath}`);
  childProcess.execSync(
    `find "${packagedAppPath}" -type f -name *.node -exec chmod a-x {} \\;`
  );
}