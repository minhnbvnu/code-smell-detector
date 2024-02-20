async function processCustomRuntimeIfNecessary(runtime, codeUri, baseDir) {
  if (runtime !== 'custom') { return; }

  debug('java project oversized, try to repack spring boot jar');

  const absCodeUri = path.resolve(baseDir, codeUri);
  const bootstrapPath = path.join(absCodeUri, 'bootstrap');
  const bootstrapContent = await readBootstrapContent(bootstrapPath);

  // 1. nas 的 CLASSPATH 依赖会在 yml 中声明
  // 2. bootstrap 中声明 spring boot 的 jar 的依赖
  // 3. 修改 bootstrap 内容
  //   3.1 添加 export CLASSPATH="$CLASSPATH:./target/java-getting-started-1.0.jar"
  //   3.2 将 java -jar -Dserver.port=$PORT target/java-getting-started-1.0.jar 修改为 java org.springframework.boot.loader.PropertiesLauncher
  const { jarfilePath, repackaged } = await detectJarfilePathFromBootstrap(bootstrapContent);

  if (jarfilePath) {
    await processSpringBootJar(absCodeUri, jarfilePath);

    if (!repackaged) {
      const replacedContent = bootstrapContent.replace(BOOTSTRAP_SPRING_BOOT_JAR_REGEX, (match, p1, p2, p3) => {
        return `export CLASSPATH="$CLASSPATH:./${p3}"
${p1}${p2} org.springframework.boot.loader.PropertiesLauncher`;
      });
      await generateRepackagedBootstrap(bootstrapPath, replacedContent);
    }

    return;
  }

  const warfilePath = await detectWarfilePathfromBootstrap(bootstrapContent);

  if (warfilePath) {
    await processWar(absCodeUri, warfilePath);

    if (bootstrapContent.indexOf('/mnt/auto/') === -1) {
      const ctxDescriptorPath = await generateJettyContextDescriptor(warfilePath);
      const newBootstrapContent = `#!/usr/bin/env bash
export JETTY_RUNNER=/mnt/auto/root/usr/local/java/jetty-runner.jar
export PORT=9000
java -jar $JETTY_RUNNER --port $PORT ${ctxDescriptorPath}
`;
      await generateRepackagedBootstrap(bootstrapPath, newBootstrapContent);
    }
  }

}