function hash32Fnv1a(array) {
    const prime = 16777619;
    let hash = 2166136261;

    for (let i = 0; i < array.length; i++) {
        hash ^= array[i];
        hash *= prime;
    }
    return hash >>> 0; // Ensure non-negative integer
}