function addDir(context, stats, isRoot) {
  const {target, output} = context;
  const {recursive} = context.options;

  if (!stats.isDirectory()) {
    throw new Error(`${target} is not a valid directory!`);
  }

  stats = Object.assign({}, stats);
  const outputPropKey = isRoot ? target : path.basename(target);

  // On windows platforms, directories do not have the executable flag, which causes FileSystem.prototype.getItem
  // to think that the directory cannot be traversed. This is a workaround, however, a better solution may be to
  // re-think the logic in FileSystem.prototype.getItem
  // This workaround adds executable privileges if read privileges are found
  stats.mode = fixWin32Permissions(stats.mode);

  // Create directory factory
  const directoryItems = {};
  output[outputPropKey] = FileSystem.directory(
    Object.assign(stats, {items: directoryItems})
  );

  fs.readdirSync(target).forEach((p) => {
    const absPath = path.join(target, p);
    const stats = fs.statSync(absPath);
    const newContext = createContext(context, {
      target: absPath,
      output: directoryItems,
    });

    if (recursive && stats.isDirectory()) {
      addDir(newContext, stats);
    } else if (stats.isFile()) {
      addFile(newContext, stats);
    }
  });

  return output[outputPropKey];
}