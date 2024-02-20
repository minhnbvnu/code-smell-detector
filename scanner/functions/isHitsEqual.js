function isHitsEqual(hit0, hit1) {
    if (!hit0 && !hit1) {
        return true;
    }
    if (hit0 && hit1) {
        return hit0.component === hit1.component &&
            isHitPropsWithin(hit0, hit1) &&
            isHitPropsWithin(hit1, hit0); // ensures all props are identical
    }
    return false;
}