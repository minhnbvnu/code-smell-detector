function createIgnoreResult(filePath, baseDir) {
        let message;
        const isHidden = filePath.split(path.sep)
            .find(segment => /^\./u.test(segment));
        const isInNodeModules = baseDir && path.relative(baseDir, filePath).startsWith("node_modules");
        if (isHidden) {
            message = "File ignored by default.  Use a negated ignore pattern (like \"--ignore-pattern '!<relative/path/to/filename>'\") to override.";
        }
        else if (isInNodeModules) {
            message = "File ignored by default. Use \"--ignore-pattern '!node_modules/*'\" to override.";
        }
        else {
            message = "File ignored because of a matching ignore pattern. Use \"--no-ignore\" to override.";
        }
        return {
            filePath: path.resolve(filePath),
            messages: [
                {
                    fatal: false,
                    severity: 1,
                    message
                }
            ],
            suppressedMessages: [],
            errorCount: 0,
            warningCount: 1,
            fatalErrorCount: 0,
            fixableErrorCount: 0,
            fixableWarningCount: 0
        };
    }