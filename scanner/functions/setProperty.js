function setProperty(pName, defaultVal) {
    if (setPropertyOptions[pName] !== undefined && setPropertyOptions[pName] !== null) {
        setPropertyTarget[pName] = setPropertyOptions[pName];
    } else {
        setPropertyTarget[pName] = defaultVal;
    }
}