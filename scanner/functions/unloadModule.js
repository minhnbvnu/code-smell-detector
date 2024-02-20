function unloadModule (module) {
    var found_module = false;

    registered_modules = _.reject(registered_modules, function (registered_module) {
        if (module.toLowerCase() === registered_module.module_name.toLowerCase()) {
            found_module = true;

            registered_module.dispose();
            return true;
        }
    });

    return found_module;
}