function lintString(sourceCode, userConfig, errorReporter, fileName) {
    let lintErrors, fixesApplied;

    try {
        if (userConfig.options.autofix || userConfig.options.autofixDryrun) {
            let result = solium.lintAndFix(sourceCode, userConfig);

            lintErrors = result.errorMessages;
            if (userConfig.options.autofix) {
                applyFixes(fileName, result);
                fixesApplied = result.fixesApplied;
            } else {
                errorReporter.reportDiff(fileName,
                    sourceCode, result.fixedSourceCode, result.fixesApplied.length);
            }
        } else {
            lintErrors = solium.lint(sourceCode, userConfig);
        }
    } catch (e) {
        // Don't abort in case of a parse error, just report it as a normal lint issue.
        if (e.name !== "SyntaxError") {
            const messageOrStackrace = userConfig.options.debug ? e.stack : e.message;
            errorReporter.reportFatal(`An error occured while linting over ${fileName}:${EOL}${messageOrStackrace}`);
            process.exit(errorCodes.ERRORS_FOUND);
        }

        lintErrors = [{
            ruleName: "",
            type: "error",
            message: `Syntax error: unexpected token ${e.found}`,
            line: e.location.start.line,
            column: e.location.start.column
        }];
    }

    // If any lint/internal errors/warnings exist, report them
    lintErrors.length &&
        errorReporter.report(fileName, sourceCode, lintErrors, fixesApplied);

    return lintErrors.reduce(function(numOfErrors, err) {
        return err.type === "error" ? numOfErrors+1 : numOfErrors;
    }, 0);
}