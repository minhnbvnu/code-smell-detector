function isCommonJSContainingModuleKind(kind) {
            return kind === 1 /* CommonJS */ || kind === 100 /* Node16 */ || kind === 199 /* NodeNext */;
        }