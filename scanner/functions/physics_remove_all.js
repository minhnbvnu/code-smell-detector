function physics_remove_all(physics) {
    // Remove all (removing mutates the
    // array, so we have to clone it first!)
    const originalArray = clone(physics.$entityArray);
    for (let a = 0; a < originalArray.length; ++a) {
        physics_remove_entity(physics, originalArray[a]);
    }
    
    // Shouldn't be needed, but make sure everything is really gone
    $Physics.Composite.clear(physics.$engine.world, false, true);
}