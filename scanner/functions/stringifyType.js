function stringifyType(parsedType, cssClass, stringifyLinkMap) {
    return catharsis.stringify(parsedType, {
        cssClass,
        htmlSafe: true,
        links: stringifyLinkMap,
    });
}