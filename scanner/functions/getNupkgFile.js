function getNupkgFile(is64bit) {
  return function(req, res) {
    let nupkgFile = req.params.nupkg;
    if (is64bit) {
      const nupkgMatch = nupkgFile.match(/atom-(.+)-(delta|full)\.nupkg/);
      if (nupkgMatch) {
        nupkgFile = `atom-x64-${nupkgMatch[1]}-${nupkgMatch[2]}.nupkg`;
      }
    }

    console.log(
      `Received request for ${req.params.nupkg}, sending ${nupkgFile}`
    );
    res.sendFile(path.join(buildPath, nupkgFile));
  };
}