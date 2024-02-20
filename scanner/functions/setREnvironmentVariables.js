function setREnvironmentVariables() {
    core.exportVariable("R_LIBS_USER", path.join(tempDirectory, "Library"));
    core.exportVariable("TZ", "UTC");
    core.exportVariable("_R_CHECK_SYSTEM_CLOCK_", "FALSE");
    if (!process.env["NOT_CRAN"])
        core.exportVariable("NOT_CRAN", "true");
}