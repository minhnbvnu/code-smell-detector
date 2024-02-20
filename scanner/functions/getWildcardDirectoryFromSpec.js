function getWildcardDirectoryFromSpec(spec, useCaseSensitiveFileNames) {
            const match = wildcardDirectoryPattern.exec(spec);
            if (match) {
                const questionWildcardIndex = spec.indexOf("?");
                const starWildcardIndex = spec.indexOf("*");
                const lastDirectorySeperatorIndex = spec.lastIndexOf(directorySeparator);
                return {
                    key: useCaseSensitiveFileNames ? match[0] : toFileNameLowerCase(match[0]),
                    flags: questionWildcardIndex !== -1 && questionWildcardIndex < lastDirectorySeperatorIndex || starWildcardIndex !== -1 && starWildcardIndex < lastDirectorySeperatorIndex ? 1 /* Recursive */ : 0 /* None */
                };
            }
            if (isImplicitGlob(spec.substring(spec.lastIndexOf(directorySeparator) + 1))) {
                return {
                    key: removeTrailingDirectorySeparator(useCaseSensitiveFileNames ? spec : toFileNameLowerCase(spec)),
                    flags: 1 /* Recursive */
                };
            }
            return void 0;
        }