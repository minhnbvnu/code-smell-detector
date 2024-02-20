function createDefaultSoliumIgnore() {
    try {
        fs.writeFileSync(
            SOLIUMIGNORE_FILENAME_ABSOLUTE,
            fs.readFileSync(DEFAULT_SOLIUMIGNORE_PATH)
        );
    } catch (e) {
        errorReporter.reportFatal(
            `An error occurred while writing to ${SOLIUMIGNORE_FILENAME_ABSOLUTE}:${EOL}${e.message}`);
        process.exit(errorCodes.WRITE_FAILED);
    }
}