function autoToggleEnabled(panel, enable) {
        var elements = panel.find(".demoWidget");
        var widgetId = panel.attr("id");
        if (typeof elements[widgetId] == "function")
            elements[widgetId](enable ? "enable" : "disable");
    }