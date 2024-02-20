function getBaseTypesIfUnrelated(leftType, rightType, isRelated) {
                let effectiveLeft = leftType;
                let effectiveRight = rightType;
                const leftBase = getBaseTypeOfLiteralType(leftType);
                const rightBase = getBaseTypeOfLiteralType(rightType);
                if (!isRelated(leftBase, rightBase)) {
                    effectiveLeft = leftBase;
                    effectiveRight = rightBase;
                }
                return [effectiveLeft, effectiveRight];
            }