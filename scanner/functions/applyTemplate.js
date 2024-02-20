function applyTemplate ( direction, template, dest ) {
  var destDirection =  (direction == 'root') ? '' : direction;
  var appName = dest.replace(/.*\//g, '');
  var templatePath = path.join(__dirname, '../templates', direction, template);
  var destPath = path.join(dest, destDirection);

  /* Copy over all the files from the specified directory */
  try {
    wrench.copyDirSyncRecursive( templatePath, destPath );
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('The template "' + template + '" could not be found.');
      process.exit(1);
    }
  }

  /* Run each file through the template renderer */
  wrench.readdirSyncRecursive(destPath).forEach(function (file) {
    var filePath = path.join(destPath, file);
    try { // Reads will fail on a directory, try/catch will catch it
      var contents = fs.readFileSync(filePath, { encoding: 'utf8' });
      var tokens = {
        appName: appName,
        synthVersion: pkg.version
      };
      if (file === '_dot_gitignore') {
        fs.unlinkSync(filePath); // Delete the file
        filePath = path.join(destPath, '.gitignore');
      }
      fs.writeFileSync( filePath, _.template(contents, tokens) );
    } catch (err) {
      if (err.code != 'EISDIR') throw err;
    }
  });
}