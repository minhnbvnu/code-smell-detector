function _method_factory(method_name, logger_name) {
        if (console[method_name] != null)
            return console[method_name].bind(console, logger_name);
        else
            return console.log.bind(console, logger_name);
    }