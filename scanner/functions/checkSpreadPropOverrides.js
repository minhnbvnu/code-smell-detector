function checkSpreadPropOverrides(type, props, spread) {
                for (const right of getPropertiesOfType(type)) {
                    if (!(right.flags & 16777216 /* Optional */)) {
                        const left = props.get(right.escapedName);
                        if (left) {
                            const diagnostic = error(left.valueDeclaration, Diagnostics._0_is_specified_more_than_once_so_this_usage_will_be_overwritten, unescapeLeadingUnderscores(left.escapedName));
                            addRelatedInfo(diagnostic, createDiagnosticForNode(spread, Diagnostics.This_spread_always_overwrites_this_property));
                        }
                    }
                }
            }