function createUnknownOptionError(unknownOption, diagnostics, createDiagnostics, unknownOptionErrorText) {
            var _a2;
            if ((_a2 = diagnostics.alternateMode) == null ? void 0 : _a2.getOptionsNameMap().optionsNameMap.has(unknownOption.toLowerCase())) {
                return createDiagnostics(diagnostics.alternateMode.diagnostic, unknownOption);
            }
            const possibleOption = getSpellingSuggestion(unknownOption, diagnostics.optionDeclarations, getOptionName);
            return possibleOption ? createDiagnostics(diagnostics.unknownDidYouMeanDiagnostic, unknownOptionErrorText || unknownOption, possibleOption.name) : createDiagnostics(diagnostics.unknownOptionDiagnostic, unknownOptionErrorText || unknownOption);
        }