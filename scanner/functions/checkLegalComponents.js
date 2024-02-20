function checkLegalComponents(comps, vec) {
    const check = (range, domain) => {
        let inside = 0;
        let outside = 0;
        for (const c of range) {
            domain.includes(c) ? inside++ : outside++;
        }
        return inside === inside && !outside;
    };
    const inLen = typeStringToLength(vec.typeString());
    const rgbaCheck = check(comps, "rgba".substr(0, inLen));
    const xyzwCheck = check(comps, "xyzw".substr(0, inLen));
    const stpqCheck = check(comps, "stpq".substr(0, inLen));
    if (!(rgbaCheck || xyzwCheck || stpqCheck)) {
        throw new Error("component sets are mixed or incorrect entirely");
    }
}