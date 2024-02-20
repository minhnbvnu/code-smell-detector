function parsePartial(text) {
            const match = partialRegExp.exec(text);
            if (!match)
                return void 0;
            const [, major, minor = "*", patch = "*", prerelease, build2] = match;
            const version2 = new Version(isWildcard(major) ? 0 : parseInt(major, 10), isWildcard(major) || isWildcard(minor) ? 0 : parseInt(minor, 10), isWildcard(major) || isWildcard(minor) || isWildcard(patch) ? 0 : parseInt(patch, 10), prerelease, build2);
            return { version: version2, major, minor, patch };
        }