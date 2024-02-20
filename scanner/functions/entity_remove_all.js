function entity_remove_all(parent) {
    for (let i = 0; i < parent.child_array.length; ++i) {
        const child = parent.child_array[i];
        if (parent !== child.parent) {
            $error('Tried to remove a child from the wrong parent')
        }
        remove_values(child.parent.child_array, child);
        if (parent.child_array[i] === child) {
            $error('Tried to remove a child that did not have a pointer back to its parent');
        }
    }
}