function isCheckedFile(sourceFile, compilerOptions) {
            return !isSourceFileJS(sourceFile) || !!isCheckJsEnabledForFile(sourceFile, compilerOptions);
        }