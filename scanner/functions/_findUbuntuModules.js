function _findUbuntuModules(args, dependencies, resolve, reject) {
  var potential = Object.keys(dependencies).map((p) => {
    if (p === 'react' || p === 'react-native')
      return null;

    return new Promise((resolve, reject) => {
      const depPath = path.join(args.root, 'node_modules', p);
      fs.readFile(path.join(depPath, 'package.json'), (err, data) => {
        const ubuntu = data && JSON.parse(data)._ubuntu;
        if (ubuntu !== undefined && ubuntu.hasOwnProperty('build')) {
          resolve({name: p, build: ubuntu.build, path: depPath});
        } else {
          resolve(null);
        }
      });
    });
  });

  Promise.all(potential).then((result) => {
    resolve(result.filter((v) => v !== null));
  }).catch((err) => {
    reject("Error assessing Ubuntu module: " + err);
  });
}