function isApplicableVersionedTypesKey(conditions, key) {
            if (conditions.indexOf("types") === -1)
                return false;
            if (!startsWith(key, "types@"))
                return false;
            const range = VersionRange.tryParse(key.substring("types@".length));
            if (!range)
                return false;
            return range.test(version);
        }