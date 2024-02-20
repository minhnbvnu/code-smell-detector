function isSignatureAssignableTo(source, target, ignoreReturnTypes) {
                return compareSignaturesRelated(source, target, ignoreReturnTypes ? 4 /* IgnoreReturnTypes */ : 0 /* None */, 
                /*reportErrors*/
                false, 
                /*errorReporter*/
                void 0, 
                /*errorReporter*/
                void 0, compareTypesAssignable, 
                /*reportUnreliableMarkers*/
                void 0) !== 0 /* False */;
            }