function rev(node) {
        _.each(node.dependsOn, function(dependency) {
            used.push(dependency.id);
            rev(dependency);
        });
        if(node.fallback) {
            used.push(node.fallback.id);
            rev(node.fallback);
            node.fallback.listeners = node.listeners;
            node.fallback.fbhold = true;
        }
        if(node.scope) {
            used.push(node.scope.id);
        }
    }