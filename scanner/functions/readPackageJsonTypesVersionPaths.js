function readPackageJsonTypesVersionPaths(jsonContent, state) {
            const typesVersions = readPackageJsonTypesVersionsField(jsonContent, state);
            if (typesVersions === void 0)
                return;
            if (state.traceEnabled) {
                for (const key in typesVersions) {
                    if (hasProperty(typesVersions, key) && !VersionRange.tryParse(key)) {
                        trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range, key);
                    }
                }
            }
            const result = getPackageJsonTypesVersionsPaths(typesVersions);
            if (!result) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_does_not_have_a_typesVersions_entry_that_matches_version_0, versionMajorMinor);
                }
                return;
            }
            const { version: bestVersionKey, paths: bestVersionPaths } = result;
            if (typeof bestVersionPaths !== "object") {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2, `typesVersions['${bestVersionKey}']`, "object", typeof bestVersionPaths);
                }
                return;
            }
            return result;
        }