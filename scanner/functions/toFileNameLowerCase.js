function toFileNameLowerCase(x) {
            return fileNameLowerCaseRegExp.test(x) ? x.replace(fileNameLowerCaseRegExp, toLowerCase) : x;
        }