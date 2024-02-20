function checkImportMetaProperty(node) {
                if (moduleKind === 100 /* Node16 */ || moduleKind === 199 /* NodeNext */) {
                    if (getSourceFileOfNode(node).impliedNodeFormat !== 99 /* ESNext */) {
                        error(node, Diagnostics.The_import_meta_meta_property_is_not_allowed_in_files_which_will_build_into_CommonJS_output);
                    }
                }
                else if (moduleKind < 6 /* ES2020 */ && moduleKind !== 4 /* System */) {
                    error(node, Diagnostics.The_import_meta_meta_property_is_only_allowed_when_the_module_option_is_es2020_es2022_esnext_system_node16_or_nodenext);
                }
                const file = getSourceFileOfNode(node);
                Debug.assert(!!(file.flags & 4194304 /* PossiblyContainsImportMeta */), "Containing file is missing import meta node flag.");
                return node.name.escapedText === "meta" ? getGlobalImportMetaType() : errorType;
            }