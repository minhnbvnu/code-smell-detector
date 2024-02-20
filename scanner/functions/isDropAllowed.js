function isDropAllowed(targetItem) {
                var matches = $.grep(drag_model.items, function(itemObject, i) {
                    if (targetItem.rdo.type === 'folder' || targetItem.rdo.type === 'parent') {
                        // drop folder inside descending folders (filetree)
                        if (startsWith(targetItem.rdo.id, itemObject.rdo.id)) {
                            return true;
                        }
                        // drop items inside the same folder (filetree)
                        if (targetItem.rdo.id === getClosestNode(itemObject.rdo.id)) {
                            return true;
                        }
                    }
                    // drop item to itself
                    return (itemObject.id === targetItem.id);
                });
                // prevent on moving (to) protect folder or to the one of selected items
                return (targetItem.rdo.attributes.writable && matches.length === 0);
            }