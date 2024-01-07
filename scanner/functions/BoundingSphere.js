constructor(center = new Vec3(), radius = 0.5) {
        Debug.assert(!Object.isFrozen(center), 'The constructor of \'BoundingSphere\' does not accept a constant (frozen) object as a \'center\' parameter');

        this.center = center;
        this.radius = radius;
    }