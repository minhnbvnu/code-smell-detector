function findMasks() {
  var found = [],
      allMasks, relevantMasks;
  // JS API does not support finding masks -- need to call a menu command for this
  // Assumes clipping paths have been unlocked
  app.executeMenuCommand('Clipping Masks menu item');
  allMasks = toArray(doc.selection);
  clearSelection();
  relevantMasks = filter(allMasks, maskIsRelevant);
  // Lock all masks; then unlock each mask in turn and identify its contents.
  forEach(allMasks, function(mask) {mask.locked = true;});
  forEach(relevantMasks, function(mask) {
    var obj = {mask: mask};
    var selection, item;

    // Select items in this mask
    mask.locked = false;
    // In earlier AI versions, executeMenuCommand() was more reliable
    // than assigning to a selection... this problem has apparently been fixed
    // app.executeMenuCommand('Clipping Masks menu item');
    doc.selection = [mask];
    // Switch selection to all masked items using a menu command
    app.executeMenuCommand('editMask'); // Object > Clipping Mask > Edit Contents

    // stash both objects and textframes
    // (optimization -- addresses poor performance when many objects are masked)
    // //  obj.items = toArray(doc.selection || []); // Stash masked items
    storeSelectedItems(obj, doc.selection || []);

    if (mask.parent.typename == "GroupItem") {
      obj.group = mask.parent; // Group mask -- stash the group

    } else if (mask.parent.typename == "Layer") {
      // Find masking layer -- the common ancestor layer of all masked items is assumed
      // to be the masked layer
      // passing in doc.selection is _much_ faster than obj.items (why?)
      obj.layer = findCommonAncestorLayer(doc.selection || []);
    } else {
      message("Unknown mask type in findMasks()");
    }

    // Clear selection and re-lock mask
    // oddly, 'deselectall' sometimes fails here -- using alternate method
    // for clearing the selection
    // app.executeMenuCommand('deselectall');
    mask.locked = true;
    doc.selection = null;

    if (obj.items.length > 0 && (obj.group || obj.layer)) {
      found.push(obj);
    }
  });
  // restore masks to unlocked state
  forEach(allMasks, function(mask) {mask.locked = false;});
  return found;
}