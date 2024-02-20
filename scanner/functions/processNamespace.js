function processNamespace(paths, root, seen) {
  var idx = paths.length;

  NAMESPACES_BY_ID[paths.join('.')] = root;

  // Loop over all of the keys in the namespace, looking for classes
  for(var key in root) {
    if (!hasOwnProp.call(root, key)) { continue; }
    var obj = root[key];

    // If we are processing the `Ember` namespace, for example, the
    // `paths` will start with `["Ember"]`. Every iteration through
    // the loop will update the **second** element of this list with
    // the key, so processing `Ember.View` will make the Array
    // `['Ember', 'View']`.
    paths[idx] = key;

    // If we have found an unprocessed class
    if (obj && obj.toString === classToString) {
      // Replace the class' `toString` with the dot-separated path
      // and set its `NAME_KEY`
      obj.toString = makeToString(paths.join('.'));
      obj[NAME_KEY] = paths.join('.');

    // Support nested namespaces
    } else if (obj && obj.isNamespace) {
      // Skip aliased namespaces
      if (seen[guidFor(obj)]) { continue; }
      seen[guidFor(obj)] = true;

      // Process the child namespace
      processNamespace(paths, obj, seen);
    }
  }

  paths.length = idx; // cut out last item
}