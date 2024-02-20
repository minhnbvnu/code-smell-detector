function exportConst() {
                return makeConst(modifiers, factory.createIdentifier(name), replaceImportUseSites(exported, useSitesToUnqualify));
            }