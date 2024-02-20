function tryParseComponents(text) {
            const match = versionRegExp.exec(text);
            if (!match)
                return void 0;
            const [, major, minor = "0", patch = "0", prerelease = "", build2 = ""] = match;
            if (prerelease && !prereleaseRegExp.test(prerelease))
                return void 0;
            if (build2 && !buildRegExp.test(build2))
                return void 0;
            return {
                major: parseInt(major, 10),
                minor: parseInt(minor, 10),
                patch: parseInt(patch, 10),
                prerelease,
                build: build2
            };
        }