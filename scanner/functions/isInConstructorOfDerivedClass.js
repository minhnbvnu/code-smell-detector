function isInConstructorOfDerivedClass() {
                return Boolean(funcInfo && funcInfo.isConstructor && funcInfo.hasExtends);
            }