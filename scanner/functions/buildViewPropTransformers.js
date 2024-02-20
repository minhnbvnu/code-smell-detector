function buildViewPropTransformers(theClasses) {
        return theClasses.map(function (theClass) {
            return new theClass();
        });
    }