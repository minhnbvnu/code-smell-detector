function loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures, state) {
            const filename = getBaseFileName(candidate);
            if (filename.indexOf(".") === -1) {
                return void 0;
            }
            let extensionless = removeFileExtension(candidate);
            if (extensionless === candidate) {
                extensionless = candidate.substring(0, candidate.lastIndexOf("."));
            }
            const extension = candidate.substring(extensionless.length);
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
            }
            return tryAddingExtensions(extensionless, extensions, extension, onlyRecordFailures, state);
        }