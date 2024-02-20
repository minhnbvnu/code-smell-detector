function firstWordUpper(str) {
    return str.replace(/\b\w+\b/g, word => word.substring(0, 1).toUpperCase() + word.substring(1));
}