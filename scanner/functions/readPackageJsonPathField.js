function readPackageJsonPathField(jsonContent, fieldName, baseDirectory, state) {
            const fileName = readPackageJsonField(jsonContent, fieldName, "string", state);
            if (fileName === void 0) {
                return;
            }
            if (!fileName) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_had_a_falsy_0_field, fieldName);
                }
                return;
            }
            const path = normalizePath(combinePaths(baseDirectory, fileName));
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_has_0_field_1_that_references_2, fieldName, fileName, path);
            }
            return path;
        }