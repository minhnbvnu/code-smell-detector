function traceResult(result2) {
                var _a2;
                if (!((_a2 = result2.resolvedTypeReferenceDirective) == null ? void 0 : _a2.resolvedFileName)) {
                    trace(host, Diagnostics.Type_reference_directive_0_was_not_resolved, typeReferenceDirectiveName);
                }
                else if (result2.resolvedTypeReferenceDirective.packageId) {
                    trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3, typeReferenceDirectiveName, result2.resolvedTypeReferenceDirective.resolvedFileName, packageIdToString(result2.resolvedTypeReferenceDirective.packageId), result2.resolvedTypeReferenceDirective.primary);
                }
                else {
                    trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, result2.resolvedTypeReferenceDirective.resolvedFileName, result2.resolvedTypeReferenceDirective.primary);
                }
            }