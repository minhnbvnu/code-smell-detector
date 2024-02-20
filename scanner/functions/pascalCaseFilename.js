function pascalCaseFilename(filename) {
                return pascalCase(filename.replace(/\.[^./]*$/, ""))
            }