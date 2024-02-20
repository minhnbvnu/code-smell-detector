function checkAndReportErrorForExportingPrimitiveType(errorLocation, name) {
                if (isPrimitiveTypeName(name) && errorLocation.parent.kind === 278 /* ExportSpecifier */) {
                    error(errorLocation, Diagnostics.Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module, name);
                    return true;
                }
                return false;
            }