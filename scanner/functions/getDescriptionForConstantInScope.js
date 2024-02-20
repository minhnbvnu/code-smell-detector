function getDescriptionForConstantInScope(scope) {
            return isClassLike(scope) ? "readonly field" : "constant";
        }