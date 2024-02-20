function getPropertySymbolOfDestructuringAssignment(location, checker) {
                        return isArrayLiteralOrObjectLiteralDestructuringPattern(location.parent.parent) ? checker.getPropertySymbolOfDestructuringAssignment(location) : void 0;
                    }