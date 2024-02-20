function dashToCamelCase(value) {
    return value
        .toLowerCase()
        .replace(/-([a-z])/g, (match) => match[1].toUpperCase());
}