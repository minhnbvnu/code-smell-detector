function processChildrenUpdates(updates, components) {
    for (let i = 0, l = updates.length; i < l; ++i) {
        updates[i].parentNode = ReactWWIDOperations.get(updates[i].parentID);
        let update = updates[i];
        actions[update.type](update, components);
    }
}