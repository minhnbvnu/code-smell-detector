function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}