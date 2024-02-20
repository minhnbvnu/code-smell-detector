function formatIdentifier(name, generateName) {
            return typeof name === "string" ? name : formatIdentifierWorker(name, Debug.checkDefined(generateName));
        }