function isDeclarationOfSymbol(node, target) {
            var _a2;
            if (!target)
                return false;
            const source = getDeclarationFromName(node) || (node.kind === 88 /* DefaultKeyword */ ? node.parent : isLiteralComputedPropertyDeclarationName(node) ? node.parent.parent : node.kind === 135 /* ConstructorKeyword */ && isConstructorDeclaration(node.parent) ? node.parent.parent : void 0);
            const commonjsSource = source && isBinaryExpression(source) ? source.left : void 0;
            return !!(source && ((_a2 = target.declarations) == null ? void 0 : _a2.some((d) => d === source || d === commonjsSource)));
        }