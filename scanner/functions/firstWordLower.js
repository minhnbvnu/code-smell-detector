function firstWordLower(str) {
    return str.replace(/\b\w+\b/g, word => word.substring(0, 1).toLowerCase() + word.substring(1));
}