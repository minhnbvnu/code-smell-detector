function getEncodedRootLength(path) {
            if (!path)
                return 0;
            const ch0 = path.charCodeAt(0);
            if (ch0 === 47 /* slash */ || ch0 === 92 /* backslash */) {
                if (path.charCodeAt(1) !== ch0)
                    return 1;
                const p1 = path.indexOf(ch0 === 47 /* slash */ ? directorySeparator : altDirectorySeparator, 2);
                if (p1 < 0)
                    return path.length;
                return p1 + 1;
            }
            if (isVolumeCharacter(ch0) && path.charCodeAt(1) === 58 /* colon */) {
                const ch2 = path.charCodeAt(2);
                if (ch2 === 47 /* slash */ || ch2 === 92 /* backslash */)
                    return 3;
                if (path.length === 2)
                    return 2;
            }
            const schemeEnd = path.indexOf(urlSchemeSeparator);
            if (schemeEnd !== -1) {
                const authorityStart = schemeEnd + urlSchemeSeparator.length;
                const authorityEnd = path.indexOf(directorySeparator, authorityStart);
                if (authorityEnd !== -1) {
                    const scheme = path.slice(0, schemeEnd);
                    const authority = path.slice(authorityStart, authorityEnd);
                    if (scheme === "file" && (authority === "" || authority === "localhost") && isVolumeCharacter(path.charCodeAt(authorityEnd + 1))) {
                        const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path, authorityEnd + 2);
                        if (volumeSeparatorEnd !== -1) {
                            if (path.charCodeAt(volumeSeparatorEnd) === 47 /* slash */) {
                                return ~(volumeSeparatorEnd + 1);
                            }
                            if (volumeSeparatorEnd === path.length) {
                                return ~volumeSeparatorEnd;
                            }
                        }
                    }
                    return ~(authorityEnd + 1);
                }
                return ~path.length;
            }
            return 0;
        }