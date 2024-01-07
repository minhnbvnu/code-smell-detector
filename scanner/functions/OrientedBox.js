constructor(worldTransform = new Mat4(), halfExtents = new Vec3(0.5, 0.5, 0.5)) {
        Debug.assert(!Object.isFrozen(worldTransform), 'The constructor of \'OrientedBox\' does not accept a constant (frozen) object as a \'worldTransform\' parameter');
        Debug.assert(!Object.isFrozen(halfExtents), 'The constructor of \'OrientedBox\' does not accept a constant (frozen) object as a \'halfExtents\' parameter');

        this.halfExtents = halfExtents;

        this._modelTransform = worldTransform.clone().invert();
        this._worldTransform = worldTransform.clone();
        this._aabb = new BoundingBox(new Vec3(), this.halfExtents);
    }