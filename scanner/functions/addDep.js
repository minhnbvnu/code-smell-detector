function addDep(line, dependsOn, dependency, symbols) {
    var contains = false;
    dependency.listeners = dependency.listeners || [];
    for(i = 0; i < dependency.listeners.length; i++) {
        if(dependency.listeners[i].id === line.id) {
            contains = true;
            break;
        }
    }
    if(!contains) {
        dependency.listeners.push(line);
    }

    contains = false;
    for(var i = 0; i < dependsOn.length; i++) {
        if(dependsOn[i].id === dependency.id) {
            contains = true;
            break;
        }
    }

    if(!contains) {
        dependsOn.push(dependency);
        walk(dependency, symbols);
    }
}