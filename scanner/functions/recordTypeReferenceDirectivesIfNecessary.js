function recordTypeReferenceDirectivesIfNecessary(typeReferenceDirectives) {
                if (!typeReferenceDirectives) {
                    return;
                }
                necessaryTypeReferences = necessaryTypeReferences || /* @__PURE__ */ new Set();
                for (const ref of typeReferenceDirectives) {
                    necessaryTypeReferences.add(ref);
                }
            }