function usesExtensionsOnImports({ imports }, hasExtension2 = or(hasJSFileExtension, hasTSFileExtension)) {
            return firstDefined(imports, ({ text }) => pathIsRelative(text) ? hasExtension2(text) : void 0) || false;
        }