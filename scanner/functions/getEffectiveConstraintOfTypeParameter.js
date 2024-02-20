function getEffectiveConstraintOfTypeParameter(node) {
            return node.constraint ? node.constraint : isJSDocTemplateTag(node.parent) && node === node.parent.typeParameters[0] ? node.parent.constraint : void 0;
        }