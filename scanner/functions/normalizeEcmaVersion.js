function normalizeEcmaVersion(ecmaVersion = 5) {
        let version = ecmaVersion === "latest" ? getLatestEcmaVersion() : ecmaVersion;
        if (typeof version !== "number") {
            throw new Error(`ecmaVersion must be a number or "latest". Received value of type ${typeof ecmaVersion} instead.`);
        }
        // Calculate ECMAScript edition number from official year version starting with
        // ES2015, which corresponds with ES6 (or a difference of 2009).
        if (version >= 2015) {
            version -= 2009;
        }
        if (!SUPPORTED_VERSIONS.includes(version)) {
            throw new Error("Invalid ecmaVersion.");
        }
        return version;
    }