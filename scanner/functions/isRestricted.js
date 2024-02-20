function isRestricted(name) {
                return Object.prototype.hasOwnProperty.call(restrictedGlobalMessages, name);
            }