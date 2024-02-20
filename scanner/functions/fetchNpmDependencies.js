function fetchNpmDependencies(destination, silent = false) {
  return new Promise((resolve, reject) => {
    const args = ["install"];
    if (silent) args.push("--silent");
    const npm = process?.platform == "win32" ? "npm.cmd" : "npm";
    const install = spawn(npm, args, { cwd: destination });
    install.on("close", resolve);
    install.on("error", reject);
  });
}