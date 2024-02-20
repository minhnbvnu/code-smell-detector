function snakeCaseToPascalCase(s) {
    return capitaliseFirstLetter(snakeCaseToCamelCase(s));
}