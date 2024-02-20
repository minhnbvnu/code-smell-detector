function isJSDocTypeReference(node) {
                return !!(node.flags & 8388608 /* JSDoc */) && (node.kind === 180 /* TypeReference */ || node.kind === 202 /* ImportType */);
            }