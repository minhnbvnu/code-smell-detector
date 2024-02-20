function getConstraintOfDistributiveConditionalType(type) {
                if (type.root.isDistributive && type.restrictiveInstantiation !== type) {
                    const simplified = getSimplifiedType(type.checkType, 
                    /*writing*/
                    false);
                    const constraint = simplified === type.checkType ? getConstraintOfType(simplified) : simplified;
                    if (constraint && constraint !== type.checkType) {
                        const instantiated = getConditionalTypeInstantiation(type, prependTypeMapping(type.root.checkType, constraint, type.mapper));
                        if (!(instantiated.flags & 131072 /* Never */)) {
                            return instantiated;
                        }
                    }
                }
                return void 0;
            }