function invalidDotDotAfterRecursiveWildcard(s) {
            const wildcardIndex = startsWith(s, "**/") ? 0 : s.indexOf("/**/");
            if (wildcardIndex === -1) {
                return false;
            }
            const lastDotIndex = endsWith(s, "/..") ? s.length : s.lastIndexOf("/../");
            return lastDotIndex > wildcardIndex;
        }