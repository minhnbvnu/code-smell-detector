async function generateBootstrap(codeDir, warPath) {
  const bootstrap = `#!/usr/bin/env bash
export JETTY_RUNNER=/code/.fun/root/usr/local/java/jetty-runner.jar
export PORT=9000
java -jar $JETTY_RUNNER --port $PORT --path / ${warPath}
`;
  
  await fs.writeFile(path.join(codeDir, 'bootstrap'), bootstrap, {
    mode: '0755'
  });
}