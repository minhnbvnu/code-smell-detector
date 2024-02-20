function parseResolutionMode(mode, pos, end, reportDiagnostic) {
            if (!mode) {
                return void 0;
            }
            if (mode === "import") {
                return 99 /* ESNext */;
            }
            if (mode === "require") {
                return 1 /* CommonJS */;
            }
            reportDiagnostic(pos, end - pos, Diagnostics.resolution_mode_should_be_either_require_or_import);
            return void 0;
        }