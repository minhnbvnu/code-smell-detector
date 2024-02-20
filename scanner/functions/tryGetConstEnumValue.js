function tryGetConstEnumValue(node) {
                if (getIsolatedModules(compilerOptions)) {
                    return void 0;
                }
                return isPropertyAccessExpression(node) || isElementAccessExpression(node) ? resolver.getConstantValue(node) : void 0;
            }