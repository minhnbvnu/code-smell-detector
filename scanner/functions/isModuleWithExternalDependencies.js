function isModuleWithExternalDependencies(content) {
    const a = regexpExportStarFrom.test(content);
    const b = regexpExportFrom.test(content);
    const c = regexpImport.test(content);
    // console.log('isModuleWithExternalDependencies', { a, b, c });
    return a || b || c;
}