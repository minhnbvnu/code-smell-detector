function getDebugInfo(index) {
            var filename = fileInfo.filename;
            return {
                lineNumber: utils.getLocation(index, parserInput.getInput()).line + 1,
                fileName: filename
            };
        }