function npm_install(base_dir) {
        const npm = process.platform != "win32" ? "npm" : "npm.cmd";
        const { status } = cp.spawnSync(npm, ["install"], { stdio: "inherit", cwd: base_dir });
        if (status != null && status != 0) {
            print(`${cyan("npm install")} failed with exit code ${red(`${status}`)}.`);
            process.exit(status);
        }
    }