function checkESModuleMarker(name) {
                if (name.kind === 79 /* Identifier */) {
                    if (idText(name) === "__esModule") {
                        return grammarErrorOnNodeSkippedOn("noEmit", name, Diagnostics.Identifier_expected_esModule_is_reserved_as_an_exported_marker_when_transforming_ECMAScript_modules);
                    }
                }
                else {
                    const elements = name.elements;
                    for (const element of elements) {
                        if (!isOmittedExpression(element)) {
                            return checkESModuleMarker(element.name);
                        }
                    }
                }
                return false;
            }