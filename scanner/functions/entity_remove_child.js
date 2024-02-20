function entity_remove_child(parent, child) {
    if (! child) { return child; }
    
    if (child.parent) {
        if (parent !== child.parent) { $error('Tried to remove a child from the wrong parent'); }
        remove_values(parent.child_array, child);
    } else if (parent.child_array.indexOf(child) !== -1) {
        $error('Tried to remove a child that did not have a pointer back to its parent');
    }
    
    child.parent = undefined;
    return child;
}