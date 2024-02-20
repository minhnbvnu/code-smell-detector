function prettyPathForFileError(error, cwd) {
            const line = formatColorAndReset(":" + error.line, "\x1B[90m" /* Grey */);
            if (pathIsAbsolute(error.fileName) && pathIsAbsolute(cwd)) {
                return getRelativePathFromDirectory(cwd, error.fileName, 
                /* ignoreCase */
                false) + line;
            }
            return error.fileName + line;
        }