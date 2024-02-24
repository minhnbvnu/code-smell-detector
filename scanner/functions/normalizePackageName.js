function normalizePackageName(name, prefix) {
        let normalizedName = name;
        /**
         * On Windows, name can come in with Windows slashes instead of Unix slashes.
         * Normalize to Unix first to avoid errors later on.
         * https://github.com/eslint/eslint/issues/5644
         */
        if (normalizedName.includes("\\")) {
            normalizedName = normalizedName.replace(/\\/gu, "/");
        }
        if (normalizedName.charAt(0) === "@") {
            /**
             * it's a scoped package
             * package name is the prefix, or just a username
             */
            const scopedPackageShortcutRegex = new RegExp(`^(@[^/]+)(?:/(?:${prefix})?)?$`, "u"), scopedPackageNameRegex = new RegExp(`^${prefix}(-|$)`, "u");
            if (scopedPackageShortcutRegex.test(normalizedName)) {
                normalizedName = normalizedName.replace(scopedPackageShortcutRegex, `$1/${prefix}`);
            }
            else if (!scopedPackageNameRegex.test(normalizedName.split("/")[1])) {
                /**
                 * for scoped packages, insert the prefix after the first / unless
                 * the path is already @scope/eslint or @scope/eslint-xxx-yyy
                 */
                normalizedName = normalizedName.replace(/^@([^/]+)\/(.*)$/u, `@$1/${prefix}-$2`);
            }
        }
        else if (!normalizedName.startsWith(`${prefix}-`)) {
            normalizedName = `${prefix}-${normalizedName}`;
        }
        return normalizedName;
    }