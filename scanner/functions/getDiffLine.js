function getDiffLine(diffPart) {
    if (diffPart.startsWith("+")) {
        return diffPart.green;
    } else if (diffPart.startsWith("-")) {
        return diffPart.red;
    }

    return diffPart;
}