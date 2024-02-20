function buildTheme(calendarOptions) {
        var themeClass = this.pluginSystem.hooks.themeClasses[calendarOptions.themeSystem] || StandardTheme;
        return new themeClass(calendarOptions);
    }