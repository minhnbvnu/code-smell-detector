function createErrorDeprecation(name, errorAfter, since, message) {
            const deprecationMessage = formatDeprecationMessage(name, 
            /*error*/
            true, errorAfter, since, message);
            return () => {
                throw new TypeError(deprecationMessage);
            };
        }