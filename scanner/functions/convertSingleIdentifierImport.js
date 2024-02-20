function convertSingleIdentifierImport(name, moduleSpecifier, checker, identifiers, quotePreference) {
            const nameSymbol = checker.getSymbolAtLocation(name);
            const namedBindingsNames = /* @__PURE__ */ new Map();
            let needDefaultImport = false;
            let useSitesToUnqualify;
            for (const use of identifiers.original.get(name.text)) {
                if (checker.getSymbolAtLocation(use) !== nameSymbol || use === name) {
                    continue;
                }
                const { parent: parent2 } = use;
                if (isPropertyAccessExpression(parent2)) {
                    const { name: { text: propertyName } } = parent2;
                    if (propertyName === "default") {
                        needDefaultImport = true;
                        const importDefaultName = use.getText();
                        (useSitesToUnqualify != null ? useSitesToUnqualify : useSitesToUnqualify = /* @__PURE__ */ new Map()).set(parent2, factory.createIdentifier(importDefaultName));
                    }
                    else {
                        Debug.assert(parent2.expression === use, "Didn't expect expression === use");
                        let idName = namedBindingsNames.get(propertyName);
                        if (idName === void 0) {
                            idName = makeUniqueName(propertyName, identifiers);
                            namedBindingsNames.set(propertyName, idName);
                        }
                        (useSitesToUnqualify != null ? useSitesToUnqualify : useSitesToUnqualify = /* @__PURE__ */ new Map()).set(parent2, factory.createIdentifier(idName));
                    }
                }
                else {
                    needDefaultImport = true;
                }
            }
            const namedBindings = namedBindingsNames.size === 0 ? void 0 : arrayFrom(mapIterator(namedBindingsNames.entries(), ([propertyName, idName]) => factory.createImportSpecifier(
            /*isTypeOnly*/
            false, propertyName === idName ? void 0 : factory.createIdentifier(propertyName), factory.createIdentifier(idName))));
            if (!namedBindings) {
                needDefaultImport = true;
            }
            return convertedImports([makeImport(needDefaultImport ? getSynthesizedDeepClone(name) : void 0, namedBindings, moduleSpecifier, quotePreference)], useSitesToUnqualify);
        }