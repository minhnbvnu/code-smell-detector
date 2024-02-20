function comparePathsByRedirectAndNumberOfDirectorySeparators(a, b) {
            return compareBooleans(b.isRedirect, a.isRedirect) || compareNumberOfDirectorySeparators(a.path, b.path);
        }