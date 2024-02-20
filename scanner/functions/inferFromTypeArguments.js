function inferFromTypeArguments(sourceTypes, targetTypes, variances) {
                    const count = sourceTypes.length < targetTypes.length ? sourceTypes.length : targetTypes.length;
                    for (let i = 0; i < count; i++) {
                        if (i < variances.length && (variances[i] & 7 /* VarianceMask */) === 2 /* Contravariant */) {
                            inferFromContravariantTypes(sourceTypes[i], targetTypes[i]);
                        }
                        else {
                            inferFromTypes(sourceTypes[i], targetTypes[i]);
                        }
                    }
                }