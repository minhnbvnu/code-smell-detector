async function checkAlreadyConfirmedForCustomSpringBoot(runtime, codeUri) {
  if (runtime !== 'custom') { return false; }
  const bootstrapPath = path.join(codeUri, 'bootstrap');

  if (!await fs.pathExists(bootstrapPath)) { return false; }

  const stat = await fs.stat(bootstrapPath);
  if (stat.size < 102400) { // 10 KB
    const content = await fs.readFile(bootstrapPath, 'utf8');
    // 对于 custom runtime 的 spring boot，如果检测到超过 50M，会提示使用 NAS 向导
    // 如果用户输入了 yes 确认，则会将 spring boot 打包的 jar 进行 repackage
    // 以及修改 bootstrap 的内容，即将 java -jar -Dserver.port=$PORT target/java-getting-started-1.0.jar 修改为 java org.springframework.boot.loader.PropertiesLauncher
    // 这里通过检测 java org.springframework.boot.loader.PropertiesLauncher 判断用户是否输入 yes 确认过，避免多次确认
    return _.includes(content, 'org.springframework.boot.loader.PropertiesLauncher');
  }

  return false;
}