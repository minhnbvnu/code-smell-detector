function fragmentHash(fragmentId) {
    if (!fragmentId) {
        return '';
    }

    return `#${fragmentId}`;
}