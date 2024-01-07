function compatibilityForLitArgs(src) {
    if (src.includes('litShaderArgs')) {
        src = src.replace(/litShaderArgs([\.a-zA-Z]+)+/g, (a, b) => {
            const newSource = 'litArgs' + b.replace(/\./g, '_');
            Debug.deprecated(`Nested struct property access is deprecated, because it's crashing some devices. Please update your custom chunks manually. In particular ${a} should be ${newSource} now.`);
            return newSource;
        });
    }
    return src;
}