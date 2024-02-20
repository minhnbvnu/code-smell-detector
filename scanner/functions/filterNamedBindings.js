function filterNamedBindings(namedBindings, keep) {
            if (namedBindings.kind === 271 /* NamespaceImport */) {
                return keep(namedBindings.name) ? namedBindings : void 0;
            }
            else {
                const newElements = namedBindings.elements.filter((e) => keep(e.name));
                return newElements.length ? factory.createNamedImports(newElements) : void 0;
            }
        }