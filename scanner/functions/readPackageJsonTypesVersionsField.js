function readPackageJsonTypesVersionsField(jsonContent, state) {
            const typesVersions = readPackageJsonField(jsonContent, "typesVersions", "object", state);
            if (typesVersions === void 0)
                return;
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_has_a_typesVersions_field_with_version_specific_path_mappings);
            }
            return typesVersions;
        }