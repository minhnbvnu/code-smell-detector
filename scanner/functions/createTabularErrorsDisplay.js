function createTabularErrorsDisplay(filesInError, host) {
            const distinctFiles = filesInError.filter((value, index, self) => index === self.findIndex((file) => (file == null ? void 0 : file.fileName) === (value == null ? void 0 : value.fileName)));
            if (distinctFiles.length === 0)
                return "";
            const numberLength = (num) => Math.log(num) * Math.LOG10E + 1;
            const fileToErrorCount = distinctFiles.map((file) => [file, countWhere(filesInError, (fileInError) => fileInError.fileName === file.fileName)]);
            const maxErrors = fileToErrorCount.reduce((acc, value) => Math.max(acc, value[1] || 0), 0);
            const headerRow = Diagnostics.Errors_Files.message;
            const leftColumnHeadingLength = headerRow.split(" ")[0].length;
            const leftPaddingGoal = Math.max(leftColumnHeadingLength, numberLength(maxErrors));
            const headerPadding = Math.max(numberLength(maxErrors) - leftColumnHeadingLength, 0);
            let tabularData = "";
            tabularData += " ".repeat(headerPadding) + headerRow + "\n";
            fileToErrorCount.forEach((row) => {
                const [file, errorCount] = row;
                const errorCountDigitsLength = Math.log(errorCount) * Math.LOG10E + 1 | 0;
                const leftPadding = errorCountDigitsLength < leftPaddingGoal ? " ".repeat(leftPaddingGoal - errorCountDigitsLength) : "";
                const fileRef = prettyPathForFileError(file, host.getCurrentDirectory());
                tabularData += `${leftPadding}${errorCount}  ${fileRef}
`;
            });
            return tabularData;
        }