async function setDriverFilePermissions(where) {
  debug('setDriverFilePermissions', where);

  const requireChmod = await new Promise((resolve) =>
    fs.access(where, fs.R_OK | fs.X_OK, (err) => {
      if (err) {
        debug('error in fs.access', where, err);
      }
      resolve(!!err);
    })
  );

  if (requireChmod) {
    await chmod(where);
  }
}