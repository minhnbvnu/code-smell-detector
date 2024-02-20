function checkCrossProductUnion(types) {
                var _a2;
                const size = getCrossProductUnionSize(types);
                if (size >= 1e5) {
                    (_a2 = tracing) == null ? void 0 : _a2.instant(tracing.Phase.CheckTypes, "checkCrossProductUnion_DepthLimit", { typeIds: types.map((t) => t.id), size });
                    error(currentNode, Diagnostics.Expression_produces_a_union_type_that_is_too_complex_to_represent);
                    return false;
                }
                return true;
            }