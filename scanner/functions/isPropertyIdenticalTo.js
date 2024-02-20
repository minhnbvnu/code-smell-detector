function isPropertyIdenticalTo(sourceProp, targetProp) {
                return compareProperties2(sourceProp, targetProp, compareTypesIdentical) !== 0 /* False */;
            }