function hostGetCanonicalFileName(host) {
            return createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host));
        }