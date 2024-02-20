function stripLeadingDirectorySeparator(s) {
            return isAnyDirectorySeparator(s.charCodeAt(0)) ? s.slice(1) : void 0;
        }