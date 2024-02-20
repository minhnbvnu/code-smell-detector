function isExportOrExportExpression(location) {
                return !!findAncestor(location, (n) => {
                    const parent2 = n.parent;
                    if (parent2 === void 0) {
                        return "quit";
                    }
                    if (isExportAssignment(parent2)) {
                        return parent2.expression === n && isEntityNameExpression(n);
                    }
                    if (isExportSpecifier(parent2)) {
                        return parent2.name === n || parent2.propertyName === n;
                    }
                    return false;
                });
            }