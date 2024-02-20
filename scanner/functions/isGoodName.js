function isGoodName(name) {
                return !isUnderscored(name) || isAllowed(name);
            }