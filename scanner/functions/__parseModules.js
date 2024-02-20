function __parseModules(projectPath, type) {
  const modules = {};
  for (const __path of __pathsModules) {
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
      if (!__path.public && name.indexOf('egg-born-module-') > -1) {
        const pathSrc = path.join(prefix, name);
        name = name.substring('egg-born-module-'.length);
        filePkg = path.join(prefix, name, 'package.json');
        const pathDest = path.join(prefix, name);
        fse.moveSync(pathSrc, pathDest);
        // throw new Error(`Should use relative name for local module: ${name}`);
      }
      // info
      const info = mparse.parseInfo(name, 'module');
      if (!info) {
        throw new Error(`module name is not valid: ${name}`);
      }
      info.vendor = __path.vendor;
      info.public = __path.public;
      info.node_modules = __path.node_modules;
      // check if exists
      if (!modules[info.relativeName]) {
        // meta
        const _package = require(filePkg);
        const root = path.dirname(filePkg);
        const moduleMeta = {
          name,
          info,
          root,
          pkg: filePkg,
          package: _package,
          js: {},
          static: {},
        };
        const _moduleMeta = __parseModule(__path, moduleMeta, type);
        if (_moduleMeta) {
          // enhance check public
          // if (_moduleMeta.info.public) {
          const file = _moduleMeta.js.front || _moduleMeta.js.backend;
          _moduleMeta.info.public = file.replace(/\\/g, '/').indexOf('/dist/') > -1;
          // }
          // record
          modules[info.relativeName] = _moduleMeta;
        }
      }
    }
  }
  return modules;
}