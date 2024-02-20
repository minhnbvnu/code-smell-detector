function updateSources(browser, files) {
  const promises = files.map(
    ({ file, find, replace }) =>
      new Promise((res, rej) => {
        const filename = resolve(__dirname, "app/.src", file);
        const watcher = chokidar.watch(filename, {
          persistent: false,
          usePolling: true,
          interval: 100
        });

        watcher.on("change", () => {
          watcher.close();
          res();
        });
        watcher.on("error", e => {
          watcher.close();
          rej(e);
        });
        watcher.on("ready", () => {
          console.log("Update source file", file);
          const content = fs.readFileSync(filename).toString();
          const newContent = content.replace(find, replace);
          fs.writeFileSync(filename, newContent);
        });
      })
  );

  return Promise.all(promises)
    .timeout(1000)
    .then(() => wait(1000))
    .then(() => browser.wait(100));
}