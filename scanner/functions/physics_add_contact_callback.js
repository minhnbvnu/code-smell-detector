function physics_add_contact_callback(physics, callback, min_depth, max_depth, contact_mask, sensors) {
    if (contact_mask === 0) { $error('A contact callback with contact_mask = 0 will never run.'); }

    physics.$contactCallbackArray.push({
        callback:      callback,
        min_depth:     min_depth || 0,
        max_depth:     (max_depth !== undefined) ? max_depth : Infinity,
        contact_mask:  (contact_mask !== undefined) ? contact_mask : 0xffffffff,
        sensors:       sensors || 'exclude'
    });
}