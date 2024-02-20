function assert_readonly(obj, prop) {
    try {
        obj[prop] = 587238956283;
    } catch (err) {}

    if (obj[prop] === 587238956283) {
        throw new Error('assert_readonly fail for property', prop);
    }
}