async function generateFontsConfAndEnv(baseDir, codeUri, appendContet) {
  const absCodeUri = path.resolve(baseDir, codeUri);
  const fontsDir = path.join(absCodeUri, 'fonts');

  if (!await fs.pathExists(fontsDir) || !await isNotEmptyDir(fontsDir)) { return {}; }

  const fontsConfPath = path.join(absCodeUri, '.fonts.conf');

  if (!await fs.pathExists(fontsConfPath)) {
    const sourcePath = path.resolve(__dirname, './utils/fonts/fonts.conf');
    // 无论是 win，mac 还是 linux 平台，运行 pkg 生成的二进制可执行文件时会其解压到 snapshot 目录 (windows 中的C:\snapshot\)
    // 在使用 fs-extra 的 copyFile 方法时，会提示 /snapshot/fun/lib/utils/fonts/fonts.conf, 推测 pkg 只对原生的 fs 支持，不兼容 fs-extra 中额外实现的方法。
    await fs.writeFile(fontsConfPath, await fs.readFile(sourcePath, 'utf8'));
  }

  if (appendContet) {
    writeFileToLine(fontsConfPath, appendContet, 29);
  }

  return DEFAULT_FONTS_CONFIG_ENV;
}