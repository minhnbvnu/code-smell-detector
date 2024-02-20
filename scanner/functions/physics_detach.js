function physics_detach(physics, attachment) {
    // Remove from the entitys
    fast_remove_value(attachment.entityB.$attachmentArray, attachment);
    if (attachment.entityA) { fast_remove_value(attachment.entityA.$attachmentArray, attachment); }

    // Decrement and remove reference-counted no-collision elements
    const mapA = attachment.entityA.$body.collisionFilter.excludedBodies;
    if (mapA) {
        const count = mapA.get(attachment.entityB.$body);
        if (count !== undefined) {
            if (count > 1) {
                mapA.set(attachment.entityB.$body, count - 1);
            } else {
                // Remove the no-collision condition
                mapA.delete(attachment.entityB.$body);
            }
        }
    }

    const mapB = attachment.entityB.$body.collisionFilter.excludedBodies;
    if (mapB) {
        const count = mapB.get(attachment.entityA.$body);
        if (count !== undefined) {
            if (count > 1) {
                mapB.set(attachment.entityA.$body, count - 1);
            } else {
                // Remove the no-collision condition
                mapB.delete(attachment.entityA.$body);
            }
        }
    }

    // Remove the composite, which will destroy all of the Matter.js elements
    // that comprise this constraint
    $Physics.Composite.remove(physics.$engine.world, attachment.$composite, true);

    if (attachment.type === 'gyro' || attachment.type === 'torsion_spring') {
        fast_remove_value(physics.customAttachments, attachment);
    }
}