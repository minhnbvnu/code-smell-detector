function set_log_level(level) {
        const previous_level = exports.logger.level;
        if ((0, types_1.isString)(level) && !(level in Logger.log_levels)) {
            console.log(`[bokeh] unrecognized logging level '${level}' passed to Bokeh.set_log_level(), ignoring`);
            console.log(`[bokeh] valid log levels are: ${Logger.levels.join(", ")}`);
        }
        else {
            console.log(`[bokeh] setting log level to: '${(0, types_1.isString)(level) ? level : level.level}'`);
            exports.logger.set_level(level);
        }
        return previous_level;
    }