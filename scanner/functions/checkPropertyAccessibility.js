function checkPropertyAccessibility(node, isSuper, writing, type, prop, reportError = true) {
                const errorNode = !reportError ? void 0 : node.kind === 163 /* QualifiedName */ ? node.right : node.kind === 202 /* ImportType */ ? node : node.kind === 205 /* BindingElement */ && node.propertyName ? node.propertyName : node.name;
                return checkPropertyAccessibilityAtLocation(node, isSuper, writing, type, prop, errorNode);
            }