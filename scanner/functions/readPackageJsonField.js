function readPackageJsonField(jsonContent, fieldName, typeOfTag, state) {
            if (!hasProperty(jsonContent, fieldName)) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_does_not_have_a_0_field, fieldName);
                }
                return;
            }
            const value = jsonContent[fieldName];
            if (typeof value !== typeOfTag || value === null) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2, fieldName, typeOfTag, value === null ? "null" : typeof value);
                }
                return;
            }
            return value;
        }