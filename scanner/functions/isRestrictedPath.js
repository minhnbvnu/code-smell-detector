function isRestrictedPath(name) {
                return Object.prototype.hasOwnProperty.call(restrictedPathMessages, name);
            }