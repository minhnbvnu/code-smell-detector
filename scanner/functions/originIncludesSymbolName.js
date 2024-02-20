function originIncludesSymbolName(origin) {
            return originIsExport(origin) || originIsResolvedExport(origin) || originIsComputedPropertyName(origin);
        }