function warnAboutTSVersion(parseSettings) {
        var _a;
        if (!isRunningSupportedTypeScriptVersion && !warnedAboutTSVersion) {
            const isTTY = typeof process === 'undefined' ? false : (_a = process.stdout) === null || _a === void 0 ? void 0 : _a.isTTY;
            if (isTTY) {
                const border = '=============';
                const versionWarning = [
                    border,
                    'WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.',
                    'You may find that it works just fine, or you may not.',
                    `SUPPORTED TYPESCRIPT VERSIONS: ${SUPPORTED_TYPESCRIPT_VERSIONS}`,
                    `YOUR TYPESCRIPT VERSION: ${ACTIVE_TYPESCRIPT_VERSION}`,
                    'Please only submit bug reports when using the officially supported version.',
                    border,
                ];
                parseSettings.log(versionWarning.join('\n\n'));
            }
            warnedAboutTSVersion = true;
        }
    }