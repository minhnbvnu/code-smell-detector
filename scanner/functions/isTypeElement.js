function isTypeElement(node) {
            const kind = node.kind;
            return kind === 177 /* ConstructSignature */ || kind === 176 /* CallSignature */ || kind === 168 /* PropertySignature */ || kind === 170 /* MethodSignature */ || kind === 178 /* IndexSignature */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */;
        }