function downloadCrx(id, crxInfo) {
  const {version, codebase} = crxInfo;
  return new Promise((resolve, reject) => {
    var crxs = getCrxDir(id);
    var crxPath = path.join(crxs, 'app-' + version + '.crx');
    if (fs.existsSync(crxPath)) {
      console.log('crx exists');
      resolve(crxPath);
    }
    else {
      console.log(`fetching crx ${codebase}`);
      return fetch(codebase)
      .then(res => {
        // ugh barf, whatever. fix this later to stream to file.
        return res.arrayBuffer();
      })
      .then(ab => {
        // save to tmp, then rename to prevent partial writes.
        var crxTmpPath = crxPath + '.tmp';
        console.log(`writing crx to ${crxPath}`)
        fs.writeFile(crxTmpPath, Buffer.from(ab), function(e) {
          console.log('done writing');
          if (e)
            reject('unable to save crx file');
          else {
            deleteRecursive(crxPath);
            fs.renameSync(crxTmpPath, crxPath);
            resolve(crxPath);
          }
        })
      })
    }
  });
}