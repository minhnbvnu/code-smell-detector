function checkGrammarMappedType(node) {
                var _a2;
                if ((_a2 = node.members) == null ? void 0 : _a2.length) {
                    return grammarErrorOnNode(node.members[0], Diagnostics.A_mapped_type_may_not_declare_properties_or_methods);
                }
            }