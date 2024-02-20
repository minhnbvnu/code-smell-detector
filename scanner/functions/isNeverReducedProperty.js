function isNeverReducedProperty(prop) {
                return isDiscriminantWithNeverType(prop) || isConflictingPrivateProperty(prop);
            }