function setupRLibrary() {
    return __awaiter(this, void 0, void 0, function* () {
        let profilePath;
        if (IS_WINDOWS) {
            profilePath = path.join(process.env["USERPROFILE"] || "C:\\", "Documents", ".Rprofile");
        }
        else {
            profilePath = path.join(process.env["HOME"] || "/Users", ".Rprofile");
        }
        core.debug("R profile is at " + profilePath);
        let rspm = process.env["RSPM"] ? `'${process.env["RSPM"]}'` : "NULL";
        if (rspm === "NULL" && core.getInput("use-public-rspm") === "true") {
            if (IS_WINDOWS) {
                rspm = "'https://packagemanager.posit.co/cran/latest'";
            }
            if (IS_LINUX) {
                let codename = "";
                try {
                    yield exec.exec("lsb_release", ["--short", "--codename"], {
                        listeners: {
                            stdout: (data) => (codename += data.toString())
                        }
                    });
                }
                catch (error) {
                    core.debug(`${error}`);
                    throw `Failed to query the linux version: ${error}`;
                }
                codename = codename.trim();
                rspm = `'https://packagemanager.posit.co/cran/__linux__/${codename}/latest'`;
            }
        }
        if (rspm !== "NULL") {
            let rspm_noq = rspm.replace(/^'|'$/g, "");
            core.exportVariable("RSPM", rspm_noq);
            core.exportVariable("RENV_CONFIG_REPOS_OVERRIDE", rspm_noq);
        }
        let cran = `'${core.getInput("cran") ||
            process.env["CRAN"] ||
            "https://cran.rstudio.com"}'`;
        let user_agent;
        if (core.getInput("http-user-agent") === "release") {
            let os = IS_WINDOWS ? "win" : IS_MAC ? "macos" : "tarball";
            let version = yield getReleaseVersion(os);
            user_agent = `sprintf("R/${version} R (${version} %s) on GitHub Actions", paste(R.version$platform, R.version$arch, R.version$os))`;
        }
        else {
            user_agent =
                core.getInput("http-user-agent") === "default" ||
                    core.getInput("http-user-agent") === ""
                    ? 'sprintf("R/%s R (%s) on GitHub Actions", getRversion(), paste(getRversion(), R.version$platform, R.version$arch, R.version$os))'
                    : `"${core.getInput("http-user-agent")}"`;
        }
        // Split the repositories by whitespace and then quote each entry joining with commas
        let extra_repositories = core.getInput("extra-repositories");
        // Prepend a , if there are extra repositories
        if (extra_repositories) {
            extra_repositories = extra_repositories
                .split(/\s+/)
                .map(x => `"${x}"`)
                .join(",");
            extra_repositories = ",\n    " + extra_repositories;
        }
        yield fs.promises.writeFile(profilePath, `Sys.setenv("PKGCACHE_HTTP_VERSION" = "2")
options(
  repos = c(
    RSPM = ${rspm},
    CRAN = ${cran}${extra_repositories}
  ),
  Ncpus = ${core.getInput("Ncpus")},
  HTTPUserAgent = ${user_agent}
)\n`);
        // Make R_LIBS_USER
        io.mkdirP(process.env["R_LIBS_USER"] || path.join(tempDirectory, "Library"));
    });
}