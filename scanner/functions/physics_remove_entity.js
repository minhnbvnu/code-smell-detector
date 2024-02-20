function physics_remove_entity(physics, entity) {
    if (entity === undefined) {
        $error('nil entity in physics_remove_entity');
    }
    
    if (! entity.$body) { return; }

    if (physics.$inSimulate) {
        // Simulation lock
        physics.$removeEntityArray.push(entity);
        return;
    }
    
    // Remove all attachments (removing mutates the
    // array, so we have to clone it first!)
    const originalArray = clone(entity.$attachmentArray);
    for (let a = 0; a < originalArray.length; ++a) {
        physics_detach(physics, originalArray[a]);
    }

    // Remove all contacts that we are maintaining.  It is OK to have
    // contacts in the broken removal queue because that ignores the
    // case where the bodies are no longer present

    // New contacts:
    const newContactArray = physics.$newContactArray;
    for (let c = 0; c < newContactArray.length; ++c) {
        const contact = newContactArray[c];
        if (contact.entityA === entity || contact.entityB === entity) {
            // Fast remove and shrink
            newContactArray[c] = last_value(newContactArray);
            --newContactArray.length;
            --c;
        }
    }

    // Maintained contacts:
    const body = entity.$body;
    const map = physics.$entityContactMap.get(body);
    if (map) {
        for (const otherBody of map.keys()) {
            // Remove the reverse pointers
            const otherMap = physics.$entityContactMap.get(otherBody);
            otherMap.delete(body);
        }
        // Remove the entire map for body, so that
        // body can be garbage collected
        physics.$entityContactMap.delete(body);
    }
    
    $Physics.World.remove(physics.$engine.world, body, true);
    fast_remove_value(physics.$entityArray, entity);
    entity.$body = undefined;
    entity.$attachmentArray = undefined;
}