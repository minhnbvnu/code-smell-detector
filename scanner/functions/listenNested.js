function listenNested(model, propNames, callback) {
    propNames.forEach(function(propName) {
        // listen to current values in array
        var curr = model.get(propName) || [];
        // support properties that are either an instance, or a
        // sequence of instances:
        if (curr instanceof ThreeModel) {
            model.listenTo(curr, 'change', callback);
            model.listenTo(curr, 'childchange', callback);
        } else {
            utils.childModelsNested(curr).forEach(function(childModel) {
                model.listenTo(childModel, 'change', callback);
                model.listenTo(childModel, 'childchange', callback);
            });
        }

        // make sure to (un)hook listeners when array changes
        model.on('change:' + propName, function(model, value) {
            var prev = model.previous(propName) || [];
            var curr = value || [];

            // Check for instance values:
            if (prev instanceof ThreeModel) {
                model.stopListening(prev);
            }
            if (curr instanceof ThreeModel) {
                model.listenTo(curr, 'change', callback);
                model.listenTo(curr, 'childchange', callback);
            }
            // Done if both are instance values:
            if (prev instanceof ThreeModel && curr instanceof ThreeModel) {
                return;
            }
            if (prev instanceof ThreeModel) {
                // Implies curr is array/dict
                utils.childModelsNested(curr).forEach(function(childModel) {
                    model.listenTo(childModel, 'change', callback);
                    model.listenTo(childModel, 'childchange', callback);
                });
            } else if (curr instanceof ThreeModel) {
                // Implies prev is array/dict
                utils.childModelsNested(prev).forEach(function(childModel) {
                    model.stopListening(childModel);
                });
            } else {
                // Both are arrays/dicts
                var diff = utils.nestedDiff(curr, prev);

                diff.added.forEach(function(childModel) {
                    model.listenTo(childModel, 'change', callback);
                    model.listenTo(childModel, 'childchange', callback);
                });
                diff.removed.forEach(function(childModel) {
                    model.stopListening(childModel);
                });
            }
        });
    });
}