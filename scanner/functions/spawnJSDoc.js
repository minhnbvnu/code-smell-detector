function spawnJSDoc(paths) {
  return new Promise((resolve, reject) => {
    let output = '';
    let errors = '';
    const cwd = path.join(baseDir, '..');
    const child = spawn(jsdoc, ['-c', jsdocConfig].concat(paths), {cwd: cwd});

    child.stdout.on('data', (data) => {
      output += String(data);
    });

    child.stderr.on('data', (data) => {
      errors += String(data);
    });

    child.on('exit', (code) => {
      if (code) {
        reject(new Error(errors || 'JSDoc failed with no output'));
        return;
      }

      let info;
      try {
        info = parseOutput(output);
      } catch (err) {
        reject(err);
        return;
      }
      resolve(info);
    });
  });
}