function selectorTypeToMessageString(selectorType) {
        const notCamelCase = selectorType.replace(/([A-Z])/g, ' $1');
        return notCamelCase.charAt(0).toUpperCase() + notCamelCase.slice(1);
    }