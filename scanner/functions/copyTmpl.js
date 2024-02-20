function copyTmpl(from, to, data = {}, opt = { cover: true }) {
  // 不覆盖时，检测文件是否存在
  if (!opt.cover && fs.existsSync(to)) {
    return;
  }

  if (!isTemplate(from)) {
    return copyFile(from, to);
  }

  const parentPath = path.dirname(to);

  mkdirSyncGuard(parentPath);

  fs.writeFileSync(to, readTmpl(from, data), { encoding: 'utf8' });
}