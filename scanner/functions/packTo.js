async function packTo(file, funignore, targetPath, prefix = '', zlibOptions = {}) {
  if (!(await fs.pathExists(file))) {
    throw new Error(`zip file ${file} is not exist.`);
  }

  debug('pack file file is %s, absFilePath is %s', file, path.resolve(file));

  const stats = await fs.lstat(file);

  if (funignore && funignore(file)) {
    throw new Error(`file ${file} is ignored.`);
  }

  debug(`append ${stats.isFile() ? 'file' : 'folder'}: ${file}, absolute path is ${path.resolve(file)}`);

  const bar = createProgressBar(`${green(':zipping')} :bar :current/:total :rate files/s, :percent :etas`, { total: 0 });

  const output = fs.createWriteStream(targetPath);
  const zipArchiver = archiver('zip', {
    zlib: _.merge({
      level: 6
    }, zlibOptions)
  }).on('progress', (progress) => {
    bar.total = progress.entries.total;
    bar.tick({
      total: progress.entries.processed
    });
  }).on('warning', (err) => {
    console.warn(err);
  }).on('error', (err) => {
    console.error(`    ${green('x')} ${targetPath} - ${grey('zip error')}`);
    throw err;
  });

  // copied from https://github.com/archiverjs/node-archiver/blob/master/lib/core.js#L834-L877
  // but add mode support
  zipArchiver.symlink = function (filepath, target, { mode }) {
    var data = {};
    data.type = 'symlink';
    data.name = filepath.replace(/\\/g, '/');
    data.linkname = target.replace(/\\/g, '/');
    data.sourceType = 'buffer';

    if (mode) {
      data.mode = mode;
    }

    this._entriesCount++;
    this._queue.push({
      data: data,
      source: new Buffer(0)
    });

    return this;
  };

  let count;

  zipArchiver.pipe(output);

  const asbFilePath = path.resolve(file);
  const isBootstrap = isBootstrapPath(asbFilePath, asbFilePath, true);

  if (stats.isFile()) {
    zipArchiver.file(asbFilePath, {
      name: path.basename(file),
      prefix,
      mode: (isBootstrap || isWindows) ? stats.mode | 73 : stats.mode // add execution permission, the binary of 73 is 001001001
    });

    count = 1;
  } else if (stats.isDirectory()) {
    count = await zipFolder(zipArchiver, file, [], funignore, file, prefix);
  } else {
    throw new Error('file %s must be a regular file or directory.', file);
  }

  return await new Promise((resolve, reject) => {
    output.on('close', () => {
      const compressedSize = zipArchiver.pointer();
      resolve({ count, compressedSize });
    });

    try {
      zipArchiver.finalize();
    } catch (err) {
      reject(err);
    }
  });
}