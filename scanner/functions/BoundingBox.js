constructor(center = new Vec3(), halfExtents = new Vec3(0.5, 0.5, 0.5)) {
        Debug.assert(!Object.isFrozen(center), 'The constructor of \'BoundingBox\' does not accept a constant (frozen) object as a \'center\' parameter');
        Debug.assert(!Object.isFrozen(halfExtents), 'The constructor of \'BoundingBox\' does not accept a constant (frozen) object as a \'halfExtents\' parameter');

        this.center = center;
        this.halfExtents = halfExtents;
    }