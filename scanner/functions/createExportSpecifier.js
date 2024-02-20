function createExportSpecifier(isTypeOnly, propertyName, name) {
                const node = createBaseNode(278 /* ExportSpecifier */);
                node.isTypeOnly = isTypeOnly;
                node.propertyName = asName(propertyName);
                node.name = asName(name);
                node.transformFlags |= propagateChildFlags(node.propertyName) | propagateChildFlags(node.name);
                node.transformFlags &= ~67108864 /* ContainsPossibleTopLevelAwait */;
                node.jsDoc = void 0;
                return node;
            }