function entity_add_child(parent, child) {
    if (! child) { return child; }
    
    entity_remove_child(parent, child);
    
    child.parent = parent;
    // Avoid accidental duplicates
    if (parent.child_array.indexOf(child) === -1) {
        parent.child_array.push(child);
    }
    
    return child;
}