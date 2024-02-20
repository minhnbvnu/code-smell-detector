function getIntersectedSignatures(signatures) {
                return getStrictOptionValue(compilerOptions, "noImplicitAny") ? reduceLeft(signatures, (left, right) => left === right || !left ? left : compareTypeParametersIdentical(left.typeParameters, right.typeParameters) ? combineSignaturesOfIntersectionMembers(left, right) : void 0) : void 0;
            }