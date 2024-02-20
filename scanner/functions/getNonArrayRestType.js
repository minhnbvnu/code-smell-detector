function getNonArrayRestType(signature) {
                const restType = getEffectiveRestType(signature);
                return restType && !isArrayType(restType) && !isTypeAny(restType) && (getReducedType(restType).flags & 131072 /* Never */) === 0 ? restType : void 0;
            }