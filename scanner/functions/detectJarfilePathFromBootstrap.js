async function detectJarfilePathFromBootstrap(bootstrapContent) {
  const matched = bootstrapContent.match(BOOTSTRAP_SPRING_BOOT_JAR_REGEX);
  let repackaged = false;
  let jarfilePath;

  if (matched) {
    jarfilePath = matched[3];
  } else {
    if (_.includes(bootstrapContent, 'org.springframework.boot.loader.PropertiesLauncher')) {
      repackaged = true;

      // export CLASSPATH = "$CLASSPATH:./target/java-getting-started-1.0.jar"
      const regex = new RegExp('[0-9a-zA-Z./_-]+\\.jar', 'm');
      const matchedJar = bootstrapContent.match(regex);
      if (matchedJar) {
        jarfilePath = matchedJar[0];
      } else {
        throw new Error('not supported your java project');
      }
    }

    debug('could not find your jar file');
  }

  return { jarfilePath, repackaged };
}