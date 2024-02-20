function isBeforeCallOfSuper() {
                return (isInConstructorOfDerivedClass() &&
                    !funcInfo.codePath.currentSegments.every(isCalled));
            }