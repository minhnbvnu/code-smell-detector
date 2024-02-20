function createTypes(base) {
    const requestType = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => {
        requestType[type] = `${base}_${type}`;
    });
    return requestType;
}