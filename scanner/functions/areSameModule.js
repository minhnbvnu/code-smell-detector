function areSameModule(a, b) {
            if (!a.body || !b.body) {
                return a.body === b.body;
            }
            return a.body.kind === b.body.kind && (a.body.kind !== 264 /* ModuleDeclaration */ || areSameModule(a.body, b.body));
        }