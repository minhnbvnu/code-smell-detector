function getParentSymbolOfTypeParameter(typeParameter) {
                const tp = getDeclarationOfKind(typeParameter.symbol, 165 /* TypeParameter */);
                const host2 = isJSDocTemplateTag(tp.parent) ? getEffectiveContainerForJSDocTemplateTag(tp.parent) : tp.parent;
                return host2 && getSymbolOfNode(host2);
            }