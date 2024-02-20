function trimPrefixAndSuffix(path) {
                const inner = withoutStartAndEnd(normalizePath(path), completePrefix, normalizedSuffix);
                return inner === void 0 ? void 0 : removeLeadingDirectorySeparator(inner);
            }