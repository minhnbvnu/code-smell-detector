function __parseSuites(projectPath) {
  const suites = {};
  for (const __path of __pathSuites) {
    const prefix = `${projectPath}/${__path.prefix}`;
    const filePkgs = eggBornUtils.tools.globbySync(`${prefix}*/package.json`);
    for (let filePkg of filePkgs) {
      // name
      let name = filePkg.split('/').slice(-2)[0];
      // check if '-' prefix exists
      if (name.substring(0, 1) === '-') {
        // skip
        continue;
      }
      // check if full name
      if (name.indexOf('egg-born-suite-') > -1) {
        const pathSrc = path.join(prefix, name);
        name = name.substring('egg-born-suite-'.length);
        filePkg = path.join(prefix, name, 'package.json');
        const pathDest = path.join(prefix, name);
        fse.moveSync(pathSrc, pathDest);
        // throw new Error(`Should use relative name for local suite: ${name}`);
      }
      // info
      const info = mparse.parseInfo(name, 'suite');
      if (!info) {
        throw new Error(`suite name is not valid: ${name}`);
      }
      info.vendor = __path.vendor;
      // check if exists
      if (!suites[info.relativeName]) {
        // meta
        const _package = require(filePkg);
        const root = path.dirname(filePkg);
        suites[info.relativeName] = {
          name,
          info,
          root,
          pkg: filePkg,
          package: _package,
          modules: [],
        };
      }
    }
  }
  // ok
  return suites;
}