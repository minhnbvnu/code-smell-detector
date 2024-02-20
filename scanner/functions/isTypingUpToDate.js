function isTypingUpToDate(cachedTyping, availableTypingVersions) {
            const availableVersion = new Version(getProperty(availableTypingVersions, `ts${versionMajorMinor}`) || getProperty(availableTypingVersions, "latest"));
            return availableVersion.compareTo(cachedTyping.version) <= 0;
        }